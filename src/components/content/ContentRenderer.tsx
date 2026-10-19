import React from 'react';
import parse, { DOMNode, Element, domToReact } from 'html-react-parser';
import Link from 'next/link';
import Image from 'next/image';
import { sanitizeContentHtml } from '../../lib/sanitize/sanitize';
import { rewriteHtmlLinks, rewriteUrl } from '../../lib/links/rewrite';

interface ContentRendererProps {
  content: string;
}

export function ContentRenderer({ content }: ContentRendererProps) {
  if (!content) return null;

  // 1. Reescreve URLs e mídias
  const rewritten = rewriteHtmlLinks(content);
  // 2. Sanitiza o HTML preservando blocos
  const cleanHtml = sanitizeContentHtml(rewritten);

  // 3. Substitui tags HTML por componentes React nativos/otimizados
  const parsed = parse(cleanHtml, {
    replace: (domNode: DOMNode) => {
      if (!(domNode instanceof Element)) return;

      // Substituição de tabelas com scroll horizontal responsivo
      if (domNode.name === 'table') {
        return (
          <div className="wp-block-table-wrapper overflow-x-auto my-6 border border-gray-200 rounded-lg shadow-2xs">
            <table className="min-w-full divide-y divide-gray-200">
              {domToReact(domNode.children as DOMNode[])}
            </table>
          </div>
        );
      }

      // Substituição de links
      if (domNode.name === 'a') {
        const href = domNode.attribs.href;
        if (!href) return;

        const rewrittenLink = rewriteUrl(href);
        const { class: className, ...restAttribs } = domNode.attribs;

        if (rewrittenLink.isInternal && !rewrittenLink.isMedia && !href.startsWith('#')) {
          return (
            <Link
              href={rewrittenLink.url}
              className={className || 'text-[#206870] underline hover:text-[#3dc17a] transition-colors'}
              {...restAttribs}
            >
              {domToReact(domNode.children as DOMNode[])}
            </Link>
          );
        }

        // Link externo ou arquivo
        return (
          <a
            href={rewrittenLink.url}
            target={rewrittenLink.isInternal ? '_self' : '_blank'}
            rel={rewrittenLink.isInternal ? undefined : 'noopener noreferrer'}
            className={className || 'text-[#206870] underline hover:text-[#3dc17a] transition-colors'}
            {...restAttribs}
          >
            {domToReact(domNode.children as DOMNode[])}
          </a>
        );
      }

      // Substituição de imagens por Next.js Image onde apropriado
      if (domNode.name === 'img') {
        const src = domNode.attribs.src || domNode.attribs['data-src'];
        if (!src) return;

        const rewrittenSrc = rewriteUrl(src).url;
        const alt = domNode.attribs.alt || '';
        const width = parseInt(domNode.attribs.width || '800', 10);
        const height = parseInt(domNode.attribs.height || '500', 10);

        return (
          <span className="block my-4 overflow-hidden rounded-md">
            <Image
              src={rewrittenSrc}
              alt={alt}
              width={isNaN(width) ? 800 : width}
              height={isNaN(height) ? 500 : height}
              className="w-full h-auto object-cover rounded-md max-w-full"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </span>
        );
      }

      // Iframes responsivos para vídeos e mapas
      if (domNode.name === 'iframe') {
        return (
          <div className="relative aspect-video w-full my-6 rounded-lg overflow-hidden shadow-md">
            <iframe
              {...domNode.attribs}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
            />
          </div>
        );
      }
    },
  });

  return <div className="entry-content">{parsed}</div>;
}
