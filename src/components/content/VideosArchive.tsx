'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from './Breadcrumbs';
import { Video, Play, ExternalLink, Calendar, Search, Radio } from 'lucide-react';
import { WpVideo } from '../../lib/wordpress/schemas';
import { rewriteUrl } from '../../lib/links/rewrite';
import { siteConfig } from '../../config/site.config';

interface VideosArchiveProps {
  videos: WpVideo[];
  title?: string;
  isLivePage?: boolean;
}

export function VideosArchive({
  videos = [],
  title = 'Transmissão das Sessões Plenárias',
  isLivePage = false,
}: VideosArchiveProps) {
  const [selectedVideo, setSelectedVideo] = useState<WpVideo | null>(
    videos.length > 0 ? videos[0] : null
  );
  const [search, setSearch] = useState('');

  const filteredVideos = videos.filter((v) =>
    (v.title?.rendered || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ name: title, url: isLivePage ? '/transmissao-das-sessoes/' : '/videos/' }]} />

      <header className="mb-8 pb-4 border-b-2 border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            <Radio size={14} className="animate-pulse text-red-600" />
            <span>TV Câmara Ao Vivo & Gravados</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#175057]">
            {title}
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Acompanhe em tempo real ou consulte o acervo de todas as sessões ordinárias, extraordinárias e audiências públicas da Câmara de Paraíso do Tocantins.
          </p>
        </div>

        <a
          href={siteConfig.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#cf2e2e] hover:bg-[#b02222] text-white font-bold text-sm rounded-md shadow-xs transition-colors self-start md:self-auto"
        >
          <span>Acessar Canal do YouTube</span>
          <ExternalLink size={16} />
        </a>
      </header>

      {/* Reprodutor Principal em Destaque */}
      <div className="bg-black rounded-2xl overflow-hidden shadow-xl mb-10">
        <div className="relative aspect-video w-full">
          <iframe
            src="https://www.youtube.com/embed?listType=search&list=Câmara%20Municipal%20de%20Paraíso%20do%20Tocantins%20Sessão"
            title="TV Câmara de Paraíso do Tocantins"
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="p-4 sm:p-6 bg-[#175057] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#3dc17a] font-bold uppercase tracking-wider block mb-0.5">
              Sessões Legislativas
            </span>
            <h2 className="text-lg sm:text-xl font-bold">
              {selectedVideo ? selectedVideo.title?.rendered?.replace(/<[^>]+>/g, '') : 'Transmissão Oficial das Sessões da Câmara'}
            </h2>
          </div>
          <div className="text-xs text-white/80 bg-white/10 px-4 py-2 rounded-md border border-white/10 shrink-0">
            <strong>Horário Oficial:</strong> Quartas-feiras às 09h00
          </div>
        </div>
      </div>

      {/* Acervo de Gravações */}
      <div className="my-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[#175057]">
            Acervo de Sessões Gravadas
          </h2>
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 w-full sm:w-64">
            <Search size={16} className="text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Buscar sessão..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-hidden text-gray-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => {
            const mediaUrl = video._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            const photoUrl = mediaUrl
              ? rewriteUrl(mediaUrl).url
              : '/arquivos/2024/04/Screenshot_7.png';
            const title = video.title?.rendered?.replace(/<[^>]+>/g, '') || 'Sessão Plenária';
            const isSelected = selectedVideo?.id === video.id;

            return (
              <div
                key={video.id}
                onClick={() => {
                  setSelectedVideo(video);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className={`bg-white rounded-xl border overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col group ${
                  isSelected ? 'border-[#206870] ring-2 ring-[#206870]/30' : 'border-gray-200 hover:border-[#3dc17a]'
                }`}
              >
                <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={photoUrl}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md">
                      <Play size={20} className="fill-white translate-x-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#206870] line-clamp-2 leading-snug mb-2">
                    {title}
                  </h3>
                  <div className="mt-auto pt-2 flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar size={12} className="text-[#3dc17a]" />
                    <span>Registro Oficial</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
