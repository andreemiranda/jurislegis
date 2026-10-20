import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from './Breadcrumbs';
import { ContentRenderer } from './ContentRenderer';
import { Bell, Calendar, ArrowLeft, Printer } from 'lucide-react';
import { rewriteUrl } from '../../lib/links/rewrite';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AvisoDetailProps {
  aviso: any;
}

export function AvisoDetail({ aviso }: AvisoDetailProps) {
  const title = aviso.title?.rendered?.replace(/<[^>]+>/g, '') || 'Aviso Oficial';
  let formattedDate = aviso.date;
  try {
    formattedDate = format(new Date(aviso.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch {
    // ignore
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { name: 'Avisos Oficiais', url: '/avisos/' },
          { name: title, url: rewriteUrl(aviso.link).url },
        ]}
      />

      <header className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#175057] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm flex items-center gap-1.5">
            <Bell size={14} />
            <span>Publicação Oficial</span>
          </span>
        </div>

        <h1
          className="text-2xl sm:text-4xl font-extrabold text-[#175057] leading-tight mb-4"
          dangerouslySetInnerHTML={{ __html: aviso.title.rendered }}
        />

        <div className="flex items-center justify-between gap-4 text-xs sm:text-sm text-gray-500">
          {formattedDate && (
            <div className="flex items-center gap-1.5">
              <Calendar size={15} className="text-[#3dc17a]" />
              <time dateTime={aviso.date}>{formattedDate}</time>
            </div>
          )}

          <button
            type="button"
            onClick={() => typeof window !== 'undefined' && window.print()}
            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-sm transition-colors print:hidden"
            title="Imprimir aviso"
          >
            <Printer size={14} />
            <span>Imprimir</span>
          </button>
        </div>
      </header>

      {aviso.content?.rendered && (
        <div className="prose prose-lg max-w-none mb-12">
          <ContentRenderer content={aviso.content.rendered} />
        </div>
      )}

      <div className="pt-6 border-t border-gray-200">
        <Link
          href="/avisos/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm rounded-md transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Voltar para todos os avisos</span>
        </Link>
      </div>
    </article>
  );
}
