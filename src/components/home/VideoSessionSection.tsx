'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Video, Play, ExternalLink, Calendar, Radio } from 'lucide-react';
import { WpVideo } from '../../lib/wordpress/schemas';
import { siteConfig } from '../../config/site.config';
import { getVideoDetails } from '../../lib/youtube/youtube';

interface VideoSessionSectionProps {
  videos?: WpVideo[];
}

export function VideoSessionSection({ videos = [] }: VideoSessionSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<WpVideo | null>(
    videos.length > 0 ? videos[0] : null
  );

  const activeVideo = selectedVideo || (videos.length > 0 ? videos[0] : null);
  const activeDetails = getVideoDetails(activeVideo);
  const activeTitle =
    activeVideo?.title?.rendered?.replace(/<[^>]+>/g, '') ||
    'Sessão Plenária da Câmara Municipal de Paraíso do Tocantins';

  return (
    <section className="wp-block-araguaia-video-session my-14 max-w-7xl mx-auto px-4" aria-labelledby="video-session-title">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-3 border-b-2 border-gray-100 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#3dc17a] font-bold text-xs uppercase tracking-wider mb-1">
            <Video size={16} />
            <span>TV Câmara & Plenário</span>
          </div>
          <h2 id="video-session-title" className="text-2xl sm:text-3xl font-extrabold text-[#175057]">
            Sessões Plenárias e Transmissões
          </h2>
        </div>
        <a
          href={siteConfig.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-[#cf2e2e] hover:bg-[#b02222] rounded-md transition-colors self-start sm:self-auto shadow-xs"
        >
          <span>Canal Oficial no YouTube</span>
          <ExternalLink size={16} />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vídeo em Destaque Principal */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-black rounded-xl overflow-hidden shadow-xl relative aspect-video w-full">
            <iframe
              key={activeDetails.embedUrl}
              src={activeDetails.embedUrl}
              title={activeTitle}
              className="w-full h-full border-0 absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#cf2e2e] font-bold uppercase tracking-wide mb-1">
                <Radio size={12} className="animate-pulse" />
                <span>Em exibição</span>
              </span>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 leading-snug">
                {activeTitle}
              </h3>
            </div>
            {activeVideo?.link && (
              <Link
                href={`/video/${activeVideo.slug}/`}
                className="text-xs font-bold text-[#206870] hover:text-[#3dc17a] transition-colors shrink-0 whitespace-nowrap self-start sm:self-auto"
              >
                Detalhes da sessão &rarr;
              </Link>
            )}
          </div>
        </div>

        {/* Lista de Sessões Recentes */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs flex flex-col h-full">
          <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider pb-3 border-b border-gray-100 mb-3 flex items-center justify-between">
            <span>Sessões Recentes</span>
            <span className="text-xs text-[#3dc17a] font-semibold">TV Legislativa</span>
          </h3>

          <div className="space-y-2.5 overflow-y-auto max-h-[420px] pr-1 flex-1">
            {videos.slice(0, 6).map((v) => {
              const details = getVideoDetails(v);
              const title = v.title?.rendered?.replace(/<[^>]+>/g, '') || 'Sessão Plenária';
              const isSelected = (selectedVideo?.id || videos[0]?.id) === v.id;

              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVideo(v)}
                  className={`w-full text-left flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#d7ebee] border-l-4 border-[#206870] shadow-xs'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="relative w-20 h-14 shrink-0 rounded-md overflow-hidden bg-gray-900">
                    <Image
                      src={details.thumbnailUrl}
                      alt={title}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                      sizes="80px"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play size={16} className="text-white fill-white translate-x-0.5" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">
                      {title}
                    </h4>
                    <span className="text-[11px] text-gray-500 flex items-center gap-1 mt-1.5">
                      <Calendar size={12} className="text-[#3dc17a]" />
                      <span>{v.slug ? v.slug.replace(/-/g, ' ') : 'Sessão'}</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100">
            <Link
              href="/transmissao-das-sessoes/"
              className="text-xs font-bold text-[#206870] hover:text-[#3dc17a] flex items-center justify-center py-1 transition-colors"
            >
              <span>Ver arquivo completo de transmissões</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
