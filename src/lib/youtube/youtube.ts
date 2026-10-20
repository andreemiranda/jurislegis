/**
 * Utilitários para extração, validação e incorporação (embed) de vídeos do YouTube.
 */

// Vídeo institucional padrão da Câmara Municipal de Paraíso do Tocantins (Solenidade de Posse / Sessão)
export const DEFAULT_YOUTUBE_ID = 'd9z6Cq2HD_4';

/**
 * Extrai o ID do vídeo do YouTube a partir de qualquer formato de link, iframe ou texto
 */
export function extractYouTubeId(urlOrText?: string | null): string | null {
  if (!urlOrText || typeof urlOrText !== 'string') return null;

  const trimmed = urlOrText.trim();
  if (!trimmed) return null;

  // Se já for diretamente um ID do YouTube (11 caracteres alfanuméricos com hífens ou underscores)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Regex para detectar ID em diversos formatos de URL do YouTube
  const patterns = [
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/|shorts\/))([\w-]{11})/,
    /(?:youtube-nocookie\.com\/(?:embed\/|v\/))([\w-]{11})/,
    /src=["'](?:https?:)?\/\/(?:www\.)?youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})["']/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1] && match[1].length === 11) {
      return match[1];
    }
  }

  return null;
}

/**
 * Gera a URL oficial de incorporação (embed) do YouTube
 */
export function getYouTubeEmbedUrl(
  videoIdOrUrl?: string | null,
  options?: { autoplay?: boolean }
): string {
  const videoId = extractYouTubeId(videoIdOrUrl) || DEFAULT_YOUTUBE_ID;
  const autoplayParam = options?.autoplay ? '&autoplay=1' : '';

  // Usamos www.youtube.com/embed/VIDEO_ID com rel=0 para manter contexto institucional
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1${autoplayParam}`;
}

/**
 * Retorna a thumbnail de alta resolução do YouTube
 */
export function getYouTubeThumbnailUrl(videoIdOrUrl?: string | null): string | null {
  const videoId = extractYouTubeId(videoIdOrUrl);
  if (!videoId) return null;
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

/**
 * Extrai dados do vídeo a partir de um objeto de CPT do WordPress (videos) ou post com ACF
 */
export function getVideoDetails(video?: any): {
  videoId: string | null;
  embedUrl: string;
  thumbnailUrl: string;
} {
  if (!video) {
    return {
      videoId: DEFAULT_YOUTUBE_ID,
      embedUrl: getYouTubeEmbedUrl(DEFAULT_YOUTUBE_ID),
      thumbnailUrl: `https://i.ytimg.com/vi/${DEFAULT_YOUTUBE_ID}/hqdefault.jpg`,
    };
  }

  // 1. Tenta recuperar da propriedade ACF do WordPress (link_video, video_url, etc)
  const acfLink =
    video.acf?.link_video ||
    video.acf?.video_url ||
    video.acf?.url ||
    video.acf?.embed;

  // 2. Tenta recuperar do conteúdo renderizado (content.rendered) ou excerto
  const contentText = video.content?.rendered || video.excerpt?.rendered || '';

  // 3. Tenta extrair o ID
  const videoId =
    extractYouTubeId(acfLink) ||
    extractYouTubeId(contentText) ||
    extractYouTubeId(video.link_video) ||
    extractYouTubeId(video.video_url);

  const finalId = videoId || DEFAULT_YOUTUBE_ID;

  // Thumbnail: Se o WordPress tiver imagem destacada personalizada, usa ela; senão usa a thumbnail do YouTube
  const wpMediaUrl = video._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const fallbackThumbnail = getYouTubeThumbnailUrl(finalId) || '/arquivos/2024/04/Screenshot_7.png';
  const thumbnailUrl = wpMediaUrl || fallbackThumbnail;

  return {
    videoId,
    embedUrl: getYouTubeEmbedUrl(finalId),
    thumbnailUrl,
  };
}
