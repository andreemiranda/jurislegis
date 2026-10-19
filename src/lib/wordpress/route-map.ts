export type RouteType =
  | 'home'
  | 'post'
  | 'page'
  | 'category'
  | 'tag'
  | 'author'
  | 'vereador'
  | 'video'
  | 'search'
  | 'feed'
  | 'not-found';

export interface RouteResolution {
  type: RouteType;
  slug: string;
  fullPath: string;
  pageNumber?: number;
  id?: number;
  params?: Record<string, string>;
}

/**
 * Normaliza um link ou pathname do WordPress para uma rota interna relativa
 * Exemplo: 'https://www.paraisodotocantins.to.leg.br/historia/' -> '/historia'
 */
export function normalizePath(urlOrPath: string): string {
  if (!urlOrPath) return '/';

  try {
    let pathname = urlOrPath;
    if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
      const parsed = new URL(urlOrPath);
      pathname = parsed.pathname;
    }

    // Remove trailing slash exceto para raiz
    let cleaned = pathname.trim();
    if (cleaned.length > 1 && cleaned.endsWith('/')) {
      cleaned = cleaned.slice(0, -1);
    }
    if (!cleaned.startsWith('/')) {
      cleaned = `/${cleaned}`;
    }
    return cleaned;
  } catch {
    return '/';
  }
}

/**
 * Resolve o tipo de rota com base nos segmentos de URL
 */
export function resolveRoute(segments: string[] = []): RouteResolution {
  if (!segments || segments.length === 0) {
    return {
      type: 'home',
      slug: '',
      fullPath: '/',
    };
  }

  const path = `/${segments.join('/')}`;

  // Paginação da home: /page/2
  if (segments[0] === 'page' && segments[1]) {
    const pageNum = parseInt(segments[1], 10);
    return {
      type: 'home',
      slug: '',
      fullPath: path,
      pageNumber: isNaN(pageNum) ? 1 : pageNum,
    };
  }

  // Vereador: /vereador/[slug]
  if (segments[0] === 'vereador' && segments[1]) {
    return {
      type: 'vereador',
      slug: segments[1],
      fullPath: path,
    };
  }

  // Vídeo: /video/[slug] ou /videos/[slug]
  if ((segments[0] === 'video' || segments[0] === 'videos') && segments[1]) {
    return {
      type: 'video',
      slug: segments[1],
      fullPath: path,
    };
  }

  // Categoria: /categoria/[slug] ou /category/[slug]
  if ((segments[0] === 'categoria' || segments[0] === 'category') && segments[1]) {
    let pageNumber = 1;
    if (segments[2] === 'page' && segments[3]) {
      pageNumber = parseInt(segments[3], 10) || 1;
    }
    return {
      type: 'category',
      slug: segments[1],
      fullPath: path,
      pageNumber,
    };
  }

  // Tag: /tag/[slug]
  if (segments[0] === 'tag' && segments[1]) {
    let pageNumber = 1;
    if (segments[2] === 'page' && segments[3]) {
      pageNumber = parseInt(segments[3], 10) || 1;
    }
    return {
      type: 'tag',
      slug: segments[1],
      fullPath: path,
      pageNumber,
    };
  }

  // Autor: /autor/[slug] ou /author/[slug]
  if ((segments[0] === 'autor' || segments[0] === 'author') && segments[1]) {
    return {
      type: 'author',
      slug: segments[1],
      fullPath: path,
    };
  }

  // Rota padrão com 1 ou múltiplos segmentos (páginas hierárquicas ou posts)
  const lastSlug = segments[segments.length - 1];
  return {
    type: 'page',
    slug: lastSlug,
    fullPath: path,
  };
}
