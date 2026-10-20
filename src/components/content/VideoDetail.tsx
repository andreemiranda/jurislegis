import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from './Breadcrumbs';
import { ContentRenderer } from './ContentRenderer';
import { Video, Calendar, ArrowLeft, ExternalLink } from 'lucide-react';
import { rewriteUrl } from '../../lib/links/rewrite';
import { siteConfig } from '../../config/site.config';
import { getVideoDetails } from '../../lib/youtube/youtube';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface VideoDetailProps {
  video: any;
}

export function VideoDetail({ video }: VideoDetailProps) {
  const details = getVideoDetails(video);
  const title = video.title?.rendered?.replace(/<[^>]+>/g, '') || 'Sessão Plenária';
  let formattedDate = video.date;
  try {
    formattedDate = format(new Date(video.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch {
    // ignore
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { name: 'Transmissão das Sessões', url: '/videos/' },
          { name: title, url: rewriteUrl(video.link).url },
        ]}
      />

      <header className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#175057] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm flex items-center gap-1.5">
            <Video size={14} />
            <span>TV Câmara Gravação</span>
          </span>
        </div>

        <h1
          className="text-2xl sm:text-4xl font-extrabold text-[#175057] leading-tight mb-4"
          dangerouslySetInnerHTML={{ __html: video.title.rendered }}
        />

        {formattedDate && (
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
            <Calendar size={15} className="text-[#3dc17a]" />
            <time dateTime={video.date}>{formattedDate}</time>
          </div>
        )}
      </header>

      {/* Reprodutor de Vídeo YouTube com ID oficial */}
      <div className="bg-black rounded-2xl overflow-hidden shadow-xl mb-10">
        <div className="relative aspect-video w-full">
          <iframe
            key={details.embedUrl}
            src={details.embedUrl}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      {video.content?.rendered && (
        <div className="prose prose-lg max-w-none mb-12">
          <ContentRenderer content={video.content.rendered} />
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-200">
        <Link
          href="/videos/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm rounded-md transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Voltar para o acervo de vídeos</span>
        </Link>

        <a
          href={siteConfig.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#cf2e2e] hover:bg-[#b02222] text-white font-bold text-sm rounded-md transition-colors"
        >
          <span>Canal no YouTube</span>
          <ExternalLink size={16} />
        </a>
      </div>
    </article>
  );
}
