import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, ChevronRight } from 'lucide-react';
import { WpVereador } from '../../lib/wordpress/schemas';
import { rewriteUrl } from '../../lib/links/rewrite';
import { vereadoresPhotoMap } from '../../config/vereadores.data';

interface VereadoresSectionProps {
  vereadores: WpVereador[];
}

export function VereadoresSection({ vereadores }: VereadoresSectionProps) {
  if (!vereadores || vereadores.length === 0) {
    return null;
  }

  return (
    <section id="vereadores" className="wp-block-araguaia-vereadores my-14 bg-gray-50 py-12 border-y border-gray-200/80" aria-labelledby="vereadores-title">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-3 border-b-2 border-gray-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#3dc17a] font-bold text-xs uppercase tracking-wider mb-1">
              <Users size={16} />
              <span>Poder Legislativo Municipal</span>
            </div>
            <h2 id="vereadores-title" className="text-2xl sm:text-3xl font-extrabold text-[#175057]">
              Vereadores em Exercício
            </h2>
          </div>
          <p className="text-sm text-gray-500 max-w-md">
            Conheça os parlamentares eleitos que representam os interesses e anseios da população de Paraíso do Tocantins
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {vereadores.map((vdr) => {
            const vdrUrl = rewriteUrl(vdr.link).url;
            const photoUrl =
              vereadoresPhotoMap[vdr.slug] ||
              (vdr._embedded?.['wp:featuredmedia']?.[0]?.source_url
                ? rewriteUrl(vdr._embedded['wp:featuredmedia'][0].source_url).url
                : '/arquivos/2024/04/20-e1713468092289.jpg');
            const name = vdr.title.rendered.replace(/<[^>]+>/g, '');

            return (
              <Link
                key={vdr.id}
                href={vdrUrl}
                className="group flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-[#3dc17a] transition-all duration-200 text-center"
              >
                <div className="relative aspect-4/5 w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={photoUrl}
                    alt={name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                    <span className="text-xs text-white font-semibold flex items-center gap-1">
                      <span>Ver biografia</span>
                      <ChevronRight size={12} />
                    </span>
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-[#206870] transition-colors line-clamp-2">
                    {name}
                  </h3>
                  <span className="text-[11px] text-gray-500 block mt-0.5">Vereador(a)</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
