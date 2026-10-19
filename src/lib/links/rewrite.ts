const DEFAULT_WP_HOST = process.env.WORDPRESS_API_URL
  ? (() => {
      try {
        return new URL(process.env.WORDPRESS_API_URL).host;
      } catch {
        return 'www.paraisodotocantins.to.leg.br';
      }
    })()
  : 'www.paraisodotocantins.to.leg.br';

const DEFAULT_SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

/**
 * Hosts conhecidos do WordPress original que devem ser tratados como internos
 */
const knownWpHosts = new Set([
  DEFAULT_WP_HOST.toLowerCase(),
  DEFAULT_WP_HOST.toLowerCase().replace(/^www\./, ''),
  `www.${DEFAULT_WP_HOST.toLowerCase().replace(/^www\./, '')}`,
  'camparaisodotocantins.nucleo.site',
  'paraisodotocantins.to.leg.br',
  'www.paraisodotocantins.to.leg.br',
]);

export interface RewriteLinkResult {
  url: string;
  isInternal: boolean;
  isMedia: boolean;
}

/**
 * Reescreve uma URL absoluta do WordPress para um caminho relativo interno
 * ou para o proxy de arquivos /arquivos/...
 */
export function rewriteUrl(rawUrl: string, customSiteUrl = DEFAULT_SITE_URL): RewriteLinkResult {
  if (!rawUrl) return { url: '', isInternal: false, isMedia: false };

  // Âncoras, mailto, tel permanecem inalterados
  if (
    rawUrl.startsWith('#') ||
    rawUrl.startsWith('mailto:') ||
    rawUrl.startsWith('tel:') ||
    rawUrl.startsWith('javascript:')
  ) {
    return { url: rawUrl, isInternal: false, isMedia: false };
  }

  // Se já for relativo
  if (rawUrl.startsWith('/')) {
    if (rawUrl.startsWith('/wp-content/uploads/')) {
      const mediaPath = rawUrl.replace(/^\/wp-content\/uploads\//, '/arquivos/');
      return { url: mediaPath, isInternal: true, isMedia: true };
    }
    return { url: rawUrl, isInternal: true, isMedia: false };
  }

  try {
    const parsed = new URL(rawUrl);
    const host = parsed.host.toLowerCase();

    // Verifica se pertence à origem do WordPress
    if (knownWpHosts.has(host)) {
      // Arquivo de mídia/upload: converte para rota interna /arquivos/
      if (parsed.pathname.includes('/wp-content/uploads/')) {
        const uploadIndex = parsed.pathname.indexOf('/wp-content/uploads/');
        const mediaSubpath = parsed.pathname.substring(uploadIndex + '/wp-content/uploads/'.length);
        return {
          url: `/arquivos/${mediaSubpath}${parsed.search}`,
          isInternal: true,
          isMedia: true,
        };
      }

      // Link interno normal
      const relativePath = `${parsed.pathname}${parsed.search}${parsed.hash}`;
      return {
        url: relativePath || '/',
        isInternal: true,
        isMedia: false,
      };
    }

    // Link externo permanece intacto
    return {
      url: rawUrl,
      isInternal: false,
      isMedia: false,
    };
  } catch {
    // Se não for URL válida (ex: âncora simples sem barra), retorna como está
    return { url: rawUrl, isInternal: false, isMedia: false };
  }
}

/**
 * Reescreve links em atributos href, src e srcset dentro de strings HTML
 */
export function rewriteHtmlLinks(html: string, siteUrl = DEFAULT_SITE_URL): string {
  if (!html) return '';

  // 1. Substitui links de uploads /wp-content/uploads/ por /arquivos/
  let processed = html.replace(
    /https?:\/\/(?:www\.)?(?:paraisodotocantins\.to\.leg\.br|camparaisodotocantins\.nucleo\.site)\/wp-content\/uploads\/([a-zA-Z0-9_\-\.\/]+)/gi,
    '/arquivos/$1'
  );

  // 2. Substitui URLs do site nos atributos href="https://www.paraisodotocantins.to.leg.br/..." por caminhos relativos
  processed = processed.replace(
    /href="https?:\/\/(?:www\.)?(?:paraisodotocantins\.to\.leg\.br|camparaisodotocantins\.nucleo\.site)(\/[^"]*)"/gi,
    (match, pathname) => {
      if (pathname.startsWith('/wp-content/uploads/')) {
        return `href="/arquivos/${pathname.replace('/wp-content/uploads/', '')}"`;
      }
      return `href="${pathname}"`;
    }
  );

  // 3. Adiciona target="_blank" e rel="noopener noreferrer" para links externos existentes no HTML
  processed = processed.replace(
    /<a\s+(?:[^>]*?\s+)?href="(https?:\/\/[^"]+)"([^>]*)>/gi,
    (match, href, rest) => {
      try {
        const url = new URL(href);
        const host = url.host.toLowerCase();
        if (knownWpHosts.has(host) || href.startsWith(siteUrl)) {
          return match;
        }
        let updated = match;
        if (!rest.includes('target=')) {
          updated = updated.replace('<a ', '<a target="_blank" ');
        }
        if (!rest.includes('rel=')) {
          updated = updated.replace('<a ', '<a rel="noopener noreferrer" ');
        }
        return updated;
      } catch {
        return match;
      }
    }
  );

  return processed;
}

/**
 * Reescreve metadados para garantir que não exponham o domínio do WordPress
 */
export function rewriteMetadataUrl(url: string | undefined, siteUrl = DEFAULT_SITE_URL): string {
  if (!url) return siteUrl;
  const res = rewriteUrl(url, siteUrl);
  if (res.isInternal) {
    return `${siteUrl}${res.url.startsWith('/') ? res.url : `/${res.url}`}`;
  }
  return url;
}
