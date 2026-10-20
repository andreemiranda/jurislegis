'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from './Breadcrumbs';
import { Camera, Calendar, ArrowRight, Search } from 'lucide-react';
import { rewriteUrl } from '../../lib/links/rewrite';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface GaleriasArchiveProps {
  galerias: any[];
}

export function GaleriasArchive({ galerias = [] }: GaleriasArchiveProps) {
  const [search, setSearch] = useState('');

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      return format(new Date(dateStr), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return dateStr;
    }
  };

  const filtered = galerias.filter((g) => {
    const title = g.title?.rendered || '';
    return title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ name: 'Galeria de Fotos', url: '/galeria-de-fotos/' }]} />

      <header className="mb-8 pb-4 border-b-2 border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#3dc17a] uppercase tracking-wider block mb-1">
            Registros Fotográficos
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#175057]">
            Galeria de Fotos
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Acompanhe a cobertura fotográfica das sessões solenes, eventos institucionais, visitas e audiências públicas da Câmara Municipal.
          </p>
        </div>

        <div className="w-full md:w-72">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Buscar álbum..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-hidden text-gray-800"
            />
          </div>
        </div>
      </header>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
          <Camera size={40} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 text-base">Nenhum álbum de fotos encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((galeria) => {
            const galeriaUrl = rewriteUrl(galeria.link).url;
            const mediaUrl = galeria._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            const imageUrl = mediaUrl
              ? rewriteUrl(mediaUrl).url
              : '/arquivos/2024/05/logo-paraios.png';
            const title = galeria.title?.rendered?.replace(/<[^>]+>/g, '') || 'Álbum Fotográfico';
            const date = formatDate(galeria.date);

            return (
              <article
                key={galeria.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <Link href={galeriaUrl} className="relative block h-52 w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-sm flex items-center gap-1.5 backdrop-blur-xs">
                    <Camera size={14} />
                    <span>Álbum</span>
                  </div>
                </Link>

                <div className="p-5 flex-1 flex flex-col">
                  {date && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                      <Calendar size={14} className="text-[#3dc17a]" />
                      <time dateTime={galeria.date}>{date}</time>
                    </div>
                  )}

                  <h2 className="text-base font-bold text-gray-900 group-hover:text-[#206870] transition-colors line-clamp-2 mb-3 leading-snug">
                    <Link href={galeriaUrl}>{title}</Link>
                  </h2>

                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <Link
                      href={galeriaUrl}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#206870] hover:text-[#3dc17a] transition-colors"
                    >
                      <span>Ver fotos do evento</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
