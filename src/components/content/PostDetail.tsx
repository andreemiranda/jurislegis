'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Tag, ChevronLeft, ChevronRight, Share2, Printer } from 'lucide-react';
import { WpPost } from '../../lib/wordpress/schemas';
import { ContentRenderer } from './ContentRenderer';
import { Breadcrumbs } from './Breadcrumbs';
import { rewriteUrl } from '../../lib/links/rewrite';
import { getNewsArticleJsonLd } from '../../lib/seo/jsonld';
import { env } from '../../config/env';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PostDetailProps {
  post: WpPost;
  relatedPosts?: WpPost[];
  previousPost?: WpPost | null;
  nextPost?: WpPost | null;
}

export function PostDetail({
  post,
  relatedPosts = [],
  previousPost,
  nextPost,
}: PostDetailProps) {
  const featuredMediaUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const imageUrl = featuredMediaUrl ? rewriteUrl(featuredMediaUrl).url : undefined;
  const authorName = post._embedded?.author?.[0]?.name || 'Câmara Municipal';
  const postUrl = `${env.SITE_URL}${rewriteUrl(post.link).url}`;

  let formattedDate = post.date;
  try {
    formattedDate = format(new Date(post.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch {
    // ignore
  }

  const categoryTerms = post._embedded?.['wp:term']?.[0] || [];
  const primaryCategory = categoryTerms[0]?.name || 'Notícias';

  const jsonLd = getNewsArticleJsonLd({
    title: post.title.rendered.replace(/<[^>]+>/g, ''),
    description: post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '',
    url: postUrl,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.modified,
    authorName,
  });

  return (
    <article className="max-w-4xl mx-auto px-4 py-8" itemScope itemType="https://schema.org/NewsArticle">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { name: primaryCategory, url: '/categoria/noticias/' },
          { name: post.title.rendered.replace(/<[^>]+>/g, ''), url: rewriteUrl(post.link).url },
        ]}
      />

      {/* Cabeçalho do Post */}
      <header className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#175057] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
            {primaryCategory}
          </span>
        </div>

        <h1
          className="text-2xl sm:text-4xl font-extrabold text-[#175057] leading-tight mb-4"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* Metadados: Data, Autor, Ações */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Calendar size={16} className="text-[#3dc17a]" />
              <time dateTime={post.date}>{formattedDate}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <User size={16} className="text-[#3dc17a]" />
              <span>{authorName}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              type="button"
              onClick={() => typeof window !== 'undefined' && window.print()}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-sm transition-colors"
              title="Imprimir notícia"
            >
              <Printer size={14} />
              <span>Imprimir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Imagem Destacada */}
      {imageUrl && (
        <div className="relative aspect-16/9 w-full rounded-lg overflow-hidden mb-8 shadow-md bg-gray-100">
          <Image
            src={imageUrl}
            alt={post.title.rendered.replace(/<[^>]+>/g, '')}
            fill
            priority
            className="object-cover"
            referrerPolicy="no-referrer"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>
      )}

      {/* Conteúdo Renderizado e Sanitizado */}
      <div className="prose prose-lg max-w-none mb-12">
        <ContentRenderer content={post.content.rendered} />
      </div>

      {/* Navegação Entre Notícias Anterior / Próxima */}
      {(previousPost || nextPost) && (
        <nav aria-label="Navegação entre matérias" className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10 pt-6 border-t border-gray-200">
          {previousPost ? (
            <Link
              href={rewriteUrl(previousPost.link).url}
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#3dc17a] hover:bg-gray-50 transition-all text-left group"
            >
              <ChevronLeft size={24} className="text-[#206870] group-hover:-translate-x-1 transition-transform shrink-0" />
              <div>
                <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold block">Notícia Anterior</span>
                <span
                  className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-[#206870]"
                  dangerouslySetInnerHTML={{ __html: previousPost.title.rendered }}
                />
              </div>
            </Link>
          ) : <div />}

          {nextPost && (
            <Link
              href={rewriteUrl(nextPost.link).url}
              className="flex items-center justify-end gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#3dc17a] hover:bg-gray-50 transition-all text-right group sm:col-start-2"
            >
              <div>
                <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold block">Próxima Notícia</span>
                <span
                  className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-[#206870]"
                  dangerouslySetInnerHTML={{ __html: nextPost.title.rendered }}
                />
              </div>
              <ChevronRight size={24} className="text-[#206870] group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          )}
        </nav>
      )}

      {/* Notícias Relacionadas */}
      {relatedPosts.length > 0 && (
        <section className="mt-12 pt-8 border-t-2 border-gray-100" aria-labelledby="related-posts-title">
          <h2 id="related-posts-title" className="text-xl font-bold text-[#175057] mb-6">
            Notícias Relacionadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => {
              const relMedia = rel._embedded?.['wp:featuredmedia']?.[0]?.source_url;
              const relImg = relMedia ? rewriteUrl(relMedia).url : '/arquivos/2024/05/logo-paraios.png';

              return (
                <Link
                  key={rel.id}
                  href={rewriteUrl(rel.link).url}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow group flex flex-col"
                >
                  <div className="relative aspect-16/10 w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={relImg}
                      alt={rel.title.rendered.replace(/<[^>]+>/g, '')}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3
                      className="text-sm font-bold text-gray-800 group-hover:text-[#206870] line-clamp-2 leading-snug"
                      dangerouslySetInnerHTML={{ __html: rel.title.rendered }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}
