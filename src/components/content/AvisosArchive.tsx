import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from './Breadcrumbs';
import { Bell, FileText, Calendar, ArrowRight, Download } from 'lucide-react';
import { rewriteUrl } from '../../lib/links/rewrite';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AvisosArchiveProps {
  avisos: any[];
}

export function AvisosArchive({ avisos = [] }: AvisosArchiveProps) {
  const formatAvisoDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ name: 'Avisos e Publicações Oficiais', url: '/avisos/' }]} />

      <header className="mb-8 pb-4 border-b-2 border-gray-100">
        <span className="text-xs font-bold text-[#3dc17a] uppercase tracking-wider block mb-1">
          Atos Oficiais e Licitações
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#175057]">
          Avisos Oficiais
        </h1>
        <p className="text-sm text-gray-600 mt-1 max-w-2xl">
          Editais de licitação, comunicados administrativos, convocações e publicações normativas da Câmara Municipal.
        </p>
      </header>

      {avisos.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
          <Bell size={40} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 text-base">Nenhum aviso publicado no momento.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {avisos.map((aviso) => {
            const avisoUrl = rewriteUrl(aviso.link).url;
            const title = aviso.title?.rendered?.replace(/<[^>]+>/g, '') || 'Aviso Oficial';
            const formattedDate = formatAvisoDate(aviso.date);

            return (
              <article
                key={aviso.id}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs hover:shadow-md hover:border-[#3dc17a] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#d7ebee] text-[#175057] group-hover:bg-[#3dc17a] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <FileText size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Calendar size={13} className="text-[#3dc17a]" />
                      <time dateTime={aviso.date}>{formattedDate}</time>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#206870] transition-colors leading-snug">
                      <Link href={avisoUrl}>{title}</Link>
                    </h2>
                  </div>
                </div>

                <Link
                  href={avisoUrl}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#206870] group-hover:text-white group-hover:bg-[#206870] border border-[#206870] rounded-md transition-colors shrink-0 self-start sm:self-auto"
                >
                  <span>Acessar Aviso</span>
                  <ArrowRight size={14} />
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
