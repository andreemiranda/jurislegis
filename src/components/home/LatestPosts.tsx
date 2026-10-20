import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import { WpPost } from '../../lib/wordpress/schemas';
import { rewriteUrl } from '../../lib/links/rewrite';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { getPostCategoryName } from '../../lib/wordpress/categories';

interface LatestPostsProps {
  posts: WpPost[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  const formatPostDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return format(d, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return dateStr;
    }
  };

  const getPostImage = (post: WpPost): string => {
    const embeddedMedia = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    if (embeddedMedia) {
      return rewriteUrl(embeddedMedia).url;
    }
    return '/arquivos/2024/05/logo-paraios.png';
  };

  const cleanExcerpt = (renderedExcerpt?: string) => {
    if (!renderedExcerpt) return '';
    return renderedExcerpt
      .replace(/<[^>]+>/g, '')
      .replace(/&hellip;/g, '...')
      .replace(/&nbsp;/g, ' ')
      .trim();
  };

  return (
    <section className="wp-block-araguaia-last-posts my-12 max-w-7xl mx-auto px-4" aria-labelledby="latest-posts-title">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-3 border-b-2 border-gray-100 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#3dc17a] font-bold text-xs uppercase tracking-wider mb-1">
            <Newspaper size={16} />
            <span>Informativo Municipal</span>
          </div>
          <h2 id="latest-posts-title" className="text-2xl sm:text-3xl font-extrabold text-[#175057]">
            Últimas Notícias
          </h2>
        </div>
        <Link
          href="/categoria/noticias/"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#175057] hover:text-white bg-[#d7ebee] hover:bg-[#175057] rounded-md transition-colors self-start sm:self-auto"
        >
          <span>Ver todas as notícias</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 6).map((post) => {
          const postUrl = rewriteUrl(post.link).url;
          const imageUrl = getPostImage(post);
          const categoryName = getPostCategoryName(post);
          const formattedDate = formatPostDate(post.date);
          const excerpt = cleanExcerpt(post.excerpt?.rendered);

          return (
            <article
              key={post.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Imagem destacada */}
              <Link href={postUrl} className="relative block h-48 w-full bg-gray-100 overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={post.title.rendered.replace(/<[^>]+>/g, '')}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {categoryName && (
                  <span className="absolute top-3 left-3 bg-[#175057] text-white text-xs font-bold px-2.5 py-1 rounded-sm shadow-xs">
                    {categoryName}
                  </span>
                )}
              </Link>

              {/* Informações e Título */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2.5">
                  <Calendar size={14} className="text-[#3dc17a]" />
                  <time dateTime={post.date}>{formattedDate}</time>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#206870] transition-colors line-clamp-2 mb-2.5 leading-snug">
                  <Link href={postUrl}>
                    <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  </Link>
                </h3>

                {excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                    {excerpt}
                  </p>
                )}

                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={postUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#206870] hover:text-[#3dc17a] transition-colors"
                  >
                    <span>Ler matéria completa</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
