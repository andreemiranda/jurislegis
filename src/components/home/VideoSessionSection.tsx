'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Video, Play, ExternalLink, Calendar } from 'lucide-react';
import { WpVideo } from '../../lib/wordpress/schemas';
import { rewriteUrl } from '../../lib/links/rewrite';
import { siteConfig } from '../../config/site.config';

interface VideoSessionSectionProps {
  videos?: WpVideo[];
}

export function VideoSessionSection({ videos = [] }: VideoSessionSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<WpVideo | null>(
    videos.length > 0 ? videos[0] : null
  );

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
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-[#cf2e2e] hover:bg-[#b02222] rounded-md transition-colors self-start sm:self-auto"
        >
          <span>Canal no YouTube</span>
          <ExternalLink size={16} />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vídeo em Destaque Principal */}
        <div className="lg:col-span-2 bg-black rounded-lg overflow-hidden shadow-lg flex flex-col justify-center relative aspect-video">
          <iframe
            src="https://www.youtube.com/embed?listType=search&list=Câmara%20Municipal%20de%20Paraíso%20do%20Tocantins%20Sessão"
            title="Transmissão das Sessões - Câmara de Paraíso do Tocantins"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Lista de Sessões Recentes */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-xs flex flex-col">
          <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider pb-3 border-b border-gray-100 mb-3 flex items-center justify-between">
            <span>Sessões Recentes</span>
            <span className="text-xs text-[#3dc17a] font-semibold">TV Legislativa</span>
          </h3>

          <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
            {videos.slice(0, 5).map((v) => {
              const mediaUrl = v._embedded?.['wp:featuredmedia']?.[0]?.source_url;
              const photoUrl = mediaUrl ? rewriteUrl(mediaUrl).url : '/arquivos/2024/04/Screenshot_7.png';
              const title = v.title?.rendered?.replace(/<[^>]+>/g, '') || 'Sessão Plenária';
              const isSelected = selectedVideo?.id === v.id;

              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVideo(v)}
                  className={`flex items-start gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#d7ebee] border-l-4 border-[#206870]' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="relative w-20 h-14 shrink-0 rounded-sm overflow-hidden bg-gray-200">
                    <Image
                      src={photoUrl}
                      alt={title}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play size={16} className="text-white fill-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug">
                      {title}
                    </h4>
                    <span className="text-[11px] text-gray-500 flex items-center gap-1 mt-1">
                      <Calendar size={12} className="text-[#3dc17a]" />
                      <span>{v.slug ? v.slug.replace(/-/g, ' ') : 'Sessão'}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-auto pt-3 border-t border-gray-100">
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
