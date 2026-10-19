import React from 'react';
import Image from 'next/image';
import { User, Award, Shield } from 'lucide-react';
import { WpVereador } from '../../lib/wordpress/schemas';
import { Breadcrumbs } from './Breadcrumbs';
import { ContentRenderer } from './ContentRenderer';
import { rewriteUrl } from '../../lib/links/rewrite';
import { vereadoresPhotoMap } from '../../config/vereadores.data';

interface VereadorDetailProps {
  vereador: WpVereador;
}

export function VereadorDetail({ vereador }: VereadorDetailProps) {
  const mediaUrl = vereador._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const photoUrl =
    vereadoresPhotoMap[vereador.slug] ||
    (mediaUrl ? rewriteUrl(mediaUrl).url : '/arquivos/2024/04/20-e1713468092289.jpg');
  const name = vereador.title.rendered.replace(/<[^>]+>/g, '');

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { name: 'Vereadores', url: '/#vereadores' },
          { name, url: rewriteUrl(vereador.link).url },
        ]}
      />

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-6 sm:p-8 my-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pb-8 border-b border-gray-100">
          <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-lg overflow-hidden bg-gray-100 shrink-0 shadow-md">
            <Image
              src={photoUrl}
              alt={name}
              fill
              priority
              className="object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 bg-[#d7ebee] text-[#175057] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-3">
              <Shield size={14} />
              <span>Parlamentar em Exercício</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#175057] mb-2 leading-tight">
              {name}
            </h1>
            <p className="text-sm font-semibold text-[#3dc17a] mb-4">
              Câmara Municipal de Paraíso do Tocantins
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600 bg-gray-50 p-4 rounded-md">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-[#206870]" />
                <span><strong>Cargo:</strong> Vereador(a) Municipal</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} className="text-[#206870]" />
                <span><strong>Mandato:</strong> Legislatura Atual</span>
              </div>
            </div>
          </div>
        </div>

        {vereador.content?.rendered && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-[#175057] mb-4 pb-2 border-b border-gray-100">
              Atribuições e Biografia Parlamentar
            </h2>
            <div className="prose prose-lg max-w-none">
              <ContentRenderer content={vereador.content.rendered} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
