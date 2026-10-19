import { z } from 'zod';

const envSchema = z.object({
  WORDPRESS_API_URL: z
    .string()
    .url()
    .default('https://www.paraisodotocantins.to.leg.br/wp-json/wp/v2'),
  SITE_URL: z
    .string()
    .url()
    .default('http://localhost:3000'),
  REVALIDATE_SECONDS: z
    .coerce
    .number()
    .int()
    .positive()
    .default(300),
  REVALIDATE_SECRET: z
    .string()
    .default('camara-paraiso-revalidate-secret-token'),
  WP_API_USER: z
    .string()
    .optional()
    .default(''),
  WP_API_APP_PASSWORD: z
    .string()
    .optional()
    .default(''),
  WP_REQUEST_DELAY_MS: z
    .coerce
    .number()
    .int()
    .nonnegative()
    .default(5000),
  WP_MAX_CONCURRENCY: z
    .coerce
    .number()
    .int()
    .positive()
    .default(2),
  NEXT_PUBLIC_GA_ID: z
    .string()
    .optional()
    .default(''),
});

const rawEnv = {
  WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
  SITE_URL: process.env.SITE_URL || (process.env.APP_URL ? `https://${process.env.APP_URL}` : undefined),
  REVALIDATE_SECONDS: process.env.REVALIDATE_SECONDS,
  REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
  WP_API_USER: process.env.WP_API_USER,
  WP_API_APP_PASSWORD: process.env.WP_API_APP_PASSWORD,
  WP_REQUEST_DELAY_MS: process.env.WP_REQUEST_DELAY_MS,
  WP_MAX_CONCURRENCY: process.env.WP_MAX_CONCURRENCY,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
};

const parsed = envSchema.safeParse(rawEnv);

if (!parsed.success) {
  console.warn('Variáveis de ambiente inválidas, utilizando padrões:', parsed.error.format());
}

export const env = parsed.success
  ? parsed.data
  : envSchema.parse({
      WORDPRESS_API_URL: 'https://www.paraisodotocantins.to.leg.br/wp-json/wp/v2',
      SITE_URL: 'http://localhost:3000',
    });

/**
 * Deriva a origem do WordPress (sem o caminho da API)
 * Exemplo: 'https://www.paraisodotocantins.to.leg.br'
 */
export function getWpOrigin(): string {
  try {
    const url = new URL(env.WORDPRESS_API_URL);
    return `${url.protocol}//${url.host}`;
  } catch {
    return 'https://www.paraisodotocantins.to.leg.br';
  }
}

/**
 * Deriva o hostname do WordPress (ex: 'www.paraisodotocantins.to.leg.br')
 */
export function getWpHost(): string {
  try {
    return new URL(env.WORDPRESS_API_URL).host;
  } catch {
    return 'www.paraisodotocantins.to.leg.br';
  }
}

export const wpOrigin = getWpOrigin();
export const wpHost = getWpHost();
