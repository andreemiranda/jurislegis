import sanitizeHtml from 'sanitize-html';

export function sanitizeContentHtml(rawHtml: string): string {
  if (!rawHtml) return '';

  return sanitizeHtml(rawHtml, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'b', 'i', 'strong', 'em',
      'strike', 'code', 'hr', 'br', 'div', 'span', 'table', 'thead', 'tbody',
      'tr', 'th', 'td', 'caption', 'ul', 'ol', 'li', 'dl', 'dt', 'dd',
      'blockquote', 'pre', 'img', 'figure', 'figcaption', 'picture', 'source',
      'iframe', 'video', 'audio', 'button', 'svg', 'path', 'g', 'circle', 'rect'
    ],
    allowedAttributes: {
      '*': ['class', 'style', 'id', 'aria-*', 'role', 'title', 'data-*'],
      a: ['href', 'name', 'target', 'rel', 'download'],
      img: ['src', 'srcset', 'sizes', 'alt', 'width', 'height', 'loading', 'decoding'],
      iframe: [
        'src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen',
        'title', 'loading', 'referrerpolicy'
      ],
      video: ['src', 'poster', 'controls', 'autoplay', 'loop', 'muted', 'preload', 'width', 'height'],
      audio: ['src', 'controls', 'autoplay', 'loop', 'muted', 'preload'],
      source: ['src', 'srcset', 'type', 'media'],
      table: ['summary', 'border'],
      th: ['scope', 'colspan', 'rowspan'],
      td: ['colspan', 'rowspan'],
      svg: ['viewBox', 'width', 'height', 'fill', 'xmlns'],
      path: ['d', 'fill', 'stroke', 'stroke-width'],
    },
    allowedIframeHostnames: [
      'www.youtube.com',
      'youtube.com',
      'www.youtube-nocookie.com',
      'youtube-nocookie.com',
      'youtu.be',
      'player.vimeo.com',
      'maps.google.com',
      'www.google.com',
      'google.com',
      'instagram.com',
      'www.instagram.com',
    ],
    transformTags: {
      a: (tagName, attribs) => {
        // Remove javascript: links
        if (attribs.href && attribs.href.toLowerCase().startsWith('javascript:')) {
          attribs.href = '#';
        }
        return {
          tagName: 'a',
          attribs,
        };
      },
    },
  });
}
