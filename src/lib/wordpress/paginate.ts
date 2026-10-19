import { wpFetch, WpFetchOptions } from './client';

export interface PaginateOptions extends WpFetchOptions {
  maxPages?: number;
  perPage?: number;
}

/**
 * Fetches all items from a paginated WordPress REST API endpoint
 * iterating through pages using X-WP-TotalPages.
 */
export async function fetchAll<T>(
  endpoint: string,
  options: PaginateOptions = {}
): Promise<T[]> {
  const perPage = options.perPage ?? 100;
  const maxPages = options.maxPages ?? Infinity;

  const firstResponse = await wpFetch<T[]>(endpoint, {
    ...options,
    params: {
      ...options.params,
      per_page: perPage,
      page: 1,
    },
  });

  const allItems: T[] = Array.isArray(firstResponse.data) ? [...firstResponse.data] : [];
  const totalPages = firstResponse.totalPages ?? 1;
  const pagesToFetch = Math.min(totalPages, maxPages);

  if (pagesToFetch <= 1) {
    return allItems;
  }

  for (let page = 2; page <= pagesToFetch; page++) {
    try {
      const res = await wpFetch<T[]>(endpoint, {
        ...options,
        params: {
          ...options.params,
          per_page: perPage,
          page,
        },
      });
      if (Array.isArray(res.data)) {
        allItems.push(...res.data);
      }
    } catch (err: any) {
      console.warn(`Erro ao buscar página ${page} de ${endpoint}:`, err.message);
      break;
    }
  }

  return allItems;
}
