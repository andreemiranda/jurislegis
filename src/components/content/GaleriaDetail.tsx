import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from './Breadcrumbs';
import { ContentRenderer } from './ContentRenderer';
import { Camera, Calendar, ArrowLeft } from 'lucide-react';
import { rewriteUrl } from '../../lib/links/rewrite';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface GaleriaDetailProps {
  galeria: any;
}

export function GaleriaDetail({ galeria }: GaleriaDetailProps) {
  const mediaUrl = galeria._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const imageUrl = mediaUrl ? rewriteUrl(mediaUrl).url : undefined;
  const title = galeria.title?.rendered?.replace(/<[^>]+>/g, '') || 'Galeria de Fotos';

  let formattedDate = galeria.date;
  try {
    formattedDate = format(new Date(galeria.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch {
    // ignore
  }

  return (
    <article className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { name: 'Galeria de Fotos', url: '/galeria-de-fotos/' },
          { name: title, url: rewriteUrl(galeria.link).url },
        ]}
      />

      <header className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#175057] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm flex items-center gap-1.5">
            <Camera size={14} />
            <span>Cobertura Fotográfica</span>
          </span>
        </div>

        <h1
          className="text-2xl sm:text-4xl font-extrabold text-[#175057] leading-tight mb-4"
          dangerouslySetInnerHTML={{ __html: galeria.title.rendered }}
        />

        {formattedDate && (
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
            <Calendar size={15} className="text-[#3dc17a]" />
            <time dateTime={galeria.date}>{formattedDate}</time>
          </div>
        )}
      </header>

      {imageUrl && (
        <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden mb-8 shadow-md bg-gray-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            className="object-cover"
            referrerPolicy="no-referrer"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      )}

      {galeria.content?.rendered && (
        <div className="prose prose-lg max-w-none mb-12">
          <ContentRenderer content={galeria.content.rendered} />
        </div>
      )}

      <div className="pt-6 border-t border-gray-200">
        <Link
          href="/galeria-de-fotos/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm rounded-md transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Voltar para todas as galerias</span>
        </Link>
      </div>
    </article>
  );
}
