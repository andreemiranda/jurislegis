import { wpFetch } from './client';
import { fetchAll } from './paginate';
import {
  WpPost,
  WpPage,
  WpCategory,
  WpTag,
  WpSearchResult,
  WpSiteInfo,
  WpVereador,
  WpVideo,
} from './schemas';
import { env } from '../../config/env';

/**
 * Retorna informações institucionais do site a partir do endpoint raiz do WordPress
 */
export async function getSiteInfo(): Promise<WpSiteInfo> {
  try {
    const url = new URL(env.WORDPRESS_API_URL);
    const rootUrl = `${url.protocol}//${url.host}/wp-json`;
    const res = await wpFetch<WpSiteInfo>('', {
      customBaseUrl: rootUrl,
      revalidate: 86400,
      tags: ['site-info'],
    });
    return res.data;
  } catch {
    return {
      name: 'Câmara Municipal de Paraíso do Tocantins',
      description: 'Portal oficial da Câmara Municipal de Paraíso do Tocantins',
      url: 'https://www.paraisodotocantins.to.leg.br',
    };
  }
}

/**
 * Busca posts com paginação
 */
export async function getPosts(params: {
  page?: number;
  perPage?: number;
  categories?: number[];
  tags?: number[];
  search?: string;
  author?: number;
} = {}): Promise<{ posts: WpPost[]; total: number; totalPages: number }> {
  try {
    const res = await wpFetch<WpPost[]>('/posts', {
      params: {
        _embed: '1',
        page: params.page ?? 1,
        per_page: params.perPage ?? 12,
        categories: params.categories?.join(','),
        tags: params.tags?.join(','),
        search: params.search,
        author: params.author,
      },
      tags: ['posts'],
    });

    return {
      posts: res.data || [],
      total: res.total ?? res.data.length,
      totalPages: res.totalPages ?? 1,
    };
  } catch (err: any) {
    console.warn('Erro ao buscar posts:', err.message);
    return { posts: [], total: 0, totalPages: 0 };
  }
}

/**
 * Busca todas as páginas do site
 */
export async function getAllPages(): Promise<WpPage[]> {
  try {
    return await fetchAll<WpPage>('/pages', {
      params: { _embed: '1' },
      tags: ['pages'],
    });
  } catch (err: any) {
    console.warn('Erro ao buscar páginas:', err.message);
    return [];
  }
}

/**
 * Busca página por slug ou caminho
 */
export async function getPageBySlug(slug: string): Promise<WpPage | null> {
  try {
    const res = await wpFetch<WpPage[]>('/pages', {
      params: { slug, _embed: '1' },
      tags: [`page:slug:${slug}`, 'pages'],
    });
    return res.data?.[0] || null;
  } catch (err: any) {
    console.warn(`Erro ao buscar página ${slug}:`, err.message);
    return null;
  }
}

/**
 * Busca post por slug
 */
export async function getPostBySlug(slug: string): Promise<WpPost | null> {
  try {
    const res = await wpFetch<WpPost[]>('/posts', {
      params: { slug, _embed: '1' },
      tags: [`post:slug:${slug}`, 'posts'],
    });
    return res.data?.[0] || null;
  } catch (err: any) {
    console.warn(`Erro ao buscar post ${slug}:`, err.message);
    return null;
  }
}

/**
 * Busca posts adjacentes (anterior e próximo)
 */
export async function getAdjacentPosts(
  currentDate: string
): Promise<{ previous: WpPost | null; next: WpPost | null }> {
  try {
    const [prevRes, nextRes] = await Promise.all([
      wpFetch<WpPost[]>('/posts', {
        params: {
          before: currentDate,
          per_page: 1,
          order: 'desc',
          orderby: 'date',
        },
      }).catch(() => ({ data: [] })),
      wpFetch<WpPost[]>('/posts', {
        params: {
          after: currentDate,
          per_page: 1,
          order: 'asc',
          orderby: 'date',
        },
      }).catch(() => ({ data: [] })),
    ]);

    return {
      previous: prevRes.data?.[0] || null,
      next: nextRes.data?.[0] || null,
    };
  } catch {
    return { previous: null, next: null };
  }
}

/**
 * Busca posts relacionados pela mesma categoria
 */
export async function getRelatedPosts(
  postId: number,
  categoryIds: number[] = [],
  limit = 3
): Promise<WpPost[]> {
  if (categoryIds.length === 0) return [];

  try {
    const res = await wpFetch<WpPost[]>('/posts', {
      params: {
        categories: categoryIds.join(','),
        exclude: postId,
        per_page: limit,
        _embed: '1',
      },
      tags: ['posts'],
    });
    return res.data || [];
  } catch {
    return [];
  }
}

/**
 * Busca todas as categorias
 */
export async function getCategories(): Promise<WpCategory[]> {
  try {
    return await fetchAll<WpCategory>('/categories', {
      params: { per_page: 100 },
      tags: ['terms', 'categories'],
    });
  } catch (err: any) {
    console.warn('Erro ao buscar categorias:', err.message);
    return [];
  }
}

/**
 * Busca categoria por slug
 */
export async function getCategoryBySlug(slug: string): Promise<WpCategory | null> {
  try {
    const res = await wpFetch<WpCategory[]>('/categories', {
      params: { slug },
      tags: [`category:${slug}`, 'categories'],
    });
    return res.data?.[0] || null;
  } catch {
    return null;
  }
}

/**
 * Busca todas as tags
 */
export async function getTags(): Promise<WpTag[]> {
  try {
    return await fetchAll<WpTag>('/tags', {
      params: { per_page: 100 },
      tags: ['terms', 'tags'],
    });
  } catch {
    return [];
  }
}

/**
 * Busca vereadores (Custom Post Type 'vereador')
 */
export async function getVereadores(): Promise<WpVereador[]> {
  try {
    const res = await wpFetch<WpVereador[]>('/vereador', {
      params: { per_page: 20, _embed: '1' },
      tags: ['vereadores'],
    });
    return res.data || [];
  } catch (err: any) {
    console.warn('Erro ao buscar vereadores:', err.message);
    return [];
  }
}

/**
 * Busca vereador por slug
 */
export async function getVereadorBySlug(slug: string): Promise<WpVereador | null> {
  try {
    const res = await wpFetch<WpVereador[]>('/vereador', {
      params: { slug, _embed: '1' },
      tags: [`vereador:${slug}`],
    });
    return res.data?.[0] || null;
  } catch {
    return null;
  }
}

/**
 * Busca vídeos da câmara / sessões (Custom Post Type 'videos')
 */
export async function getVideos(limit = 6): Promise<WpVideo[]> {
  try {
    const res = await wpFetch<WpVideo[]>('/videos', {
      params: { per_page: limit, _embed: '1' },
      tags: ['videos'],
    });
    return res.data || [];
  } catch (err: any) {
    console.warn('Erro ao buscar vídeos:', err.message);
    return [];
  }
}

/**
 * Busca banners da home (Custom Post Type 'banner')
 */
export async function getBanners(): Promise<any[]> {
  try {
    const res = await wpFetch<any[]>('/banner', {
      params: { per_page: 10, _embed: '1' },
      tags: ['banner'],
    });
    return res.data || [];
  } catch {
    return [];
  }
}

/**
 * Busca por termo usando /wp/v2/search ou posts
 */
export async function searchContent(query: string, page = 1, perPage = 10): Promise<{
  results: WpSearchResult[];
  total: number;
  totalPages: number;
}> {
  try {
    const res = await wpFetch<WpSearchResult[]>('/search', {
      params: {
        search: query,
        page,
        per_page: perPage,
        _embed: '1',
      },
    });
    return {
      results: res.data || [],
      total: res.total ?? res.data.length,
      totalPages: res.totalPages ?? 1,
    };
  } catch (err: any) {
    console.warn(`Erro na busca por "${query}":`, err.message);
    return { results: [], total: 0, totalPages: 0 };
  }
}
