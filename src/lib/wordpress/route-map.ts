export type RouteType =
  | 'home'
  | 'post'
  | 'page'
  | 'category'
  | 'tag'
  | 'author'
  | 'vereador'
  | 'video'
  | 'videos-archive'
  | 'servico'
  | 'services-archive'
  | 'aviso'
  | 'avisos-archive'
  | 'galeria'
  | 'galerias-archive'
  | 'transmissao-sessoes'
  | 'fale-conosco'
  | 'mapa-do-site'
  | 'acessibilidade'
  | 'noticias-archive'
  | 'estrutura'
  | 'date-archive'
  | 'search'
  | 'feed'
  | 'not-found';

export interface RouteResolution {
  type: RouteType;
  slug: string;
  fullPath: string;
  pageNumber?: number;
  id?: number;
  year?: string;
  month?: string;
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
  const first = segments[0]?.toLowerCase();

  // Paginação da home: /page/2
  if (first === 'page' && segments[1]) {
    const pageNum = parseInt(segments[1], 10);
    return {
      type: 'home',
      slug: '',
      fullPath: path,
      pageNumber: isNaN(pageNum) ? 1 : pageNum,
    };
  }

  // Notícias arquivo: /noticias ou /noticias/page/2
  if (first === 'noticias') {
    let pageNumber = 1;
    if (segments[1] === 'page' && segments[2]) {
      pageNumber = parseInt(segments[2], 10) || 1;
    }
    return {
      type: 'noticias-archive',
      slug: 'noticias',
      fullPath: path,
      pageNumber,
    };
  }

  // Fale Conosco: /fale-conosco
  if (first === 'fale-conosco') {
    return {
      type: 'fale-conosco',
      slug: 'fale-conosco',
      fullPath: path,
    };
  }

  // Mapa do Site: /mapa-do-site
  if (first === 'mapa-do-site') {
    return {
      type: 'mapa-do-site',
      slug: 'mapa-do-site',
      fullPath: path,
    };
  }

  // Acessibilidade: /acessibilidade
  if (first === 'acessibilidade') {
    return {
      type: 'acessibilidade',
      slug: 'acessibilidade',
      fullPath: path,
    };
  }

  // Transmissão das Sessões: /transmissao-das-sessoes ou /sessoes
  if (first === 'transmissao-das-sessoes' || first === 'sessoes') {
    return {
      type: 'transmissao-sessoes',
      slug: first,
      fullPath: path,
    };
  }

  // Serviços arquivo: /servicos
  if (first === 'servicos') {
    return {
      type: 'services-archive',
      slug: 'servicos',
      fullPath: path,
    };
  }

  // Serviço individual: /servico/[slug]
  if (first === 'servico' && segments[1]) {
    return {
      type: 'servico',
      slug: segments[1],
      fullPath: path,
    };
  }

  // Galeria de fotos arquivo: /galeria-de-fotos ou /galeria-de-fotos-2
  if (first === 'galeria-de-fotos' || first === 'galeria-de-fotos-2') {
    return {
      type: 'galerias-archive',
      slug: first,
      fullPath: path,
    };
  }

  // Galeria individual: /galeria/[slug]
  if (first === 'galeria' && segments[1]) {
    return {
      type: 'galeria',
      slug: segments[1],
      fullPath: path,
    };
  }

  // Avisos arquivo: /avisos
  if (first === 'avisos') {
    return {
      type: 'avisos-archive',
      slug: 'avisos',
      fullPath: path,
    };
  }

  // Aviso individual: /aviso/[slug]
  if (first === 'aviso' && segments[1]) {
    return {
      type: 'aviso',
      slug: segments[1],
      fullPath: path,
    };
  }

  // Vídeos arquivo: /videos (sem slug subsequente)
  if (first === 'videos' && segments.length === 1) {
    return {
      type: 'videos-archive',
      slug: 'videos',
      fullPath: path,
    };
  }

  // Vídeo individual: /video/[slug] ou /videos/[slug]
  if ((first === 'video' || first === 'videos') && segments[1]) {
    return {
      type: 'video',
      slug: segments[1],
      fullPath: path,
    };
  }

  // Vereador: /vereador/[slug]
  if (first === 'vereador' && segments[1]) {
    return {
      type: 'vereador',
      slug: segments[1],
      fullPath: path,
    };
  }

  // Estrutura organizacional CPT: /estrutura/[...sub]
  if (first === 'estrutura') {
    return {
      type: 'estrutura',
      slug: segments[segments.length - 1],
      fullPath: path,
    };
  }

  // Arquivo por ano/mês: /2024/05
  if (/^\d{4}$/.test(first) && segments[1] && /^\d{2}$/.test(segments[1])) {
    return {
      type: 'date-archive',
      slug: `${first}-${segments[1]}`,
      year: first,
      month: segments[1],
      fullPath: path,
    };
  }

  // Categoria: /categoria/[slug] ou /category/[slug]
  if ((first === 'categoria' || first === 'category') && segments[1]) {
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
  if (first === 'tag' && segments[1]) {
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
  if ((first === 'autor' || first === 'author') && segments[1]) {
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
