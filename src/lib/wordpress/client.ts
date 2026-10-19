import { env } from '../../config/env';

export class WordPressApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string,
    public responseBody?: unknown
  ) {
    super(message);
    this.name = 'WordPressApiError';
  }
}

export interface WpFetchOptions {
  params?: Record<string, string | number | boolean | undefined>;
  revalidate?: number;
  tags?: string[];
  timeoutMs?: number;
  maxRetries?: number;
  customBaseUrl?: string;
}

export interface WpResponse<T> {
  data: T;
  total: number | null;
  totalPages: number | null;
  status: number;
}

// In-process concurrency and rate limiting queue
let activeRequests = 0;
const waitingQueue: Array<() => void> = [];
let lastRequestTime = 0;

async function acquireRateLimitSlot(): Promise<void> {
  const maxConcurrency = env.WP_MAX_CONCURRENCY || 2;
  const delayMs = env.WP_REQUEST_DELAY_MS || 0;

  if (activeRequests >= maxConcurrency) {
    await new Promise<void>((resolve) => waitingQueue.push(resolve));
  }
  activeRequests++;

  const now = Date.now();
  const timeSinceLast = now - lastRequestTime;
  if (delayMs > 0 && timeSinceLast < delayMs) {
    const waitTime = delayMs - timeSinceLast;
    await new Promise((r) => setTimeout(r, waitTime));
  }
  lastRequestTime = Date.now();
}

function releaseRateLimitSlot(): void {
  activeRequests--;
  if (waitingQueue.length > 0) {
    const next = waitingQueue.shift();
    if (next) next();
  }
}

/**
 * Executes a resilient, rate-limited, and cached request to the WordPress REST API.
 */
export async function wpFetch<T>(
  endpoint: string,
  options: WpFetchOptions = {}
): Promise<WpResponse<T>> {
  const baseUrl = options.customBaseUrl || env.WORDPRESS_API_URL;
  const timeoutMs = options.timeoutMs ?? 15000;
  const maxRetries = options.maxRetries ?? 3;
  const revalidate = options.revalidate ?? env.REVALIDATE_SECONDS;

  // Build query string
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = new URL(`${baseUrl}${cleanEndpoint}`);

  if (options.params) {
    for (const [key, value] of Object.entries(options.params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'User-Agent': `PortalCamaraParaiso/1.0 (+${env.SITE_URL})`,
  };

  if (env.WP_API_USER && env.WP_API_APP_PASSWORD) {
    const token = Buffer.from(`${env.WP_API_USER}:${env.WP_API_APP_PASSWORD}`).toString('base64');
    headers['Authorization'] = `Basic ${token}`;
  }

  let attempt = 0;
  let lastError: unknown = null;

  while (attempt < maxRetries) {
    attempt++;
    await acquireRateLimitSlot();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const fetchConfig: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {
        headers,
        signal: controller.signal,
        next: {
          revalidate,
          tags: options.tags,
        },
      };

      const response = await fetch(url.toString(), fetchConfig);
      clearTimeout(timeout);

      // Handle 429 Too Many Requests with Retry-After header
      if (response.status === 429) {
        const retryAfterHeader = response.headers.get('Retry-After');
        const waitSec = retryAfterHeader ? parseInt(retryAfterHeader, 10) : 5 * attempt;
        releaseRateLimitSlot();
        await new Promise((r) => setTimeout(r, waitSec * 1000));
        continue;
      }

      // Handle 5xx errors with exponential backoff
      if (response.status >= 500 && attempt < maxRetries) {
        releaseRateLimitSlot();
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
        continue;
      }

      const totalHeader = response.headers.get('X-WP-Total') || response.headers.get('x-wp-total');
      const totalPagesHeader = response.headers.get('X-WP-TotalPages') || response.headers.get('x-wp-totalpages');

      const total = totalHeader ? parseInt(totalHeader, 10) : null;
      const totalPages = totalPagesHeader ? parseInt(totalPagesHeader, 10) : null;

      if (!response.ok) {
        let errBody: unknown = null;
        try {
          errBody = await response.json();
        } catch {
          // ignore
        }
        releaseRateLimitSlot();
        throw new WordPressApiError(
          `Erro HTTP ${response.status} ao acessar ${endpoint}`,
          response.status,
          endpoint,
          errBody
        );
      }

      const data = (await response.json()) as T;
      releaseRateLimitSlot();
      return {
        data,
        total,
        totalPages,
        status: response.status,
      };
    } catch (err: any) {
      clearTimeout(timeout);
      releaseRateLimitSlot();
      lastError = err;

      if (err instanceof WordPressApiError && (err.statusCode === 404 || err.statusCode === 403 || err.statusCode === 401)) {
        // Do not retry client 404/403/401 errors
        throw err;
      }

      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
      }
    }
  }

  throw (
    lastError ||
    new WordPressApiError(`Falha após ${maxRetries} tentativas ao acessar ${endpoint}`, undefined, endpoint)
  );
}
