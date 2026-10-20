import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { WpPost } from '../../lib/wordpress/schemas';
import { Breadcrumbs } from './Breadcrumbs';
import { Pagination } from './Pagination';
import { rewriteUrl } from '../../lib/links/rewrite';
import { getPostCategoryName } from '../../lib/wordpress/categories';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PostListProps {
  title: string;
  description?: string;
  posts: WpPost[];
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function PostList({
  title,
  description,
  posts,
  currentPage,
  totalPages,
  basePath,
}: PostListProps) {
  const formatPostDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ name: title, url: basePath }]} />

      <header className="mb-8 pb-4 border-b-2 border-gray-100">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#175057] mb-2">{title}</h1>
        {description && <p className="text-gray-600 text-sm">{description}</p>}
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-base">Nenhum conteúdo encontrado para esta listagem.</p>
          <Link
            href="/"
            className="inline-block mt-4 text-sm font-semibold text-[#206870] hover:underline"
          >
            Voltar para a página inicial
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const postUrl = rewriteUrl(post.link).url;
              const mediaUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
              const imageUrl = mediaUrl
                ? rewriteUrl(mediaUrl).url
                : '/arquivos/2024/05/logo-paraios.png';
              const formattedDate = formatPostDate(post.date);
              const categoryName = getPostCategoryName(post);

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
                >
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

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                      <Calendar size={14} className="text-[#3dc17a]" />
                      <time dateTime={post.date}>{formattedDate}</time>
                    </div>

                    <h2 className="text-base font-bold text-gray-900 group-hover:text-[#206870] transition-colors line-clamp-2 mb-3 leading-snug">
                      <Link href={postUrl}>
                        <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      </Link>
                    </h2>

                    {post.excerpt?.rendered && (
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                        {post.excerpt.rendered.replace(/<[^>]+>/g, '').trim()}
                      </p>
                    )}

                    <div className="mt-auto pt-3 border-t border-gray-100">
                      <Link
                        href={postUrl}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#206870] hover:text-[#3dc17a] transition-colors"
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

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={basePath}
          />
        </>
      )}
    </div>
  );
}
