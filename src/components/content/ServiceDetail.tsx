import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from './Breadcrumbs';
import { ContentRenderer } from './ContentRenderer';
import { FileText, Clock, Building, ArrowLeft, Send } from 'lucide-react';
import { rewriteUrl } from '../../lib/links/rewrite';
import { siteConfig } from '../../config/site.config';

interface ServiceDetailProps {
  service: any;
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const title = service.title?.rendered?.replace(/<[^>]+>/g, '') || 'Serviço';
  const excerpt = service.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '';
  const content = service.content?.rendered || '';

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { name: 'Serviços', url: '/servicos/' },
          { name: title, url: rewriteUrl(service.link).url },
        ]}
      />

      <header className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#175057] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
            Serviço ao Cidadão
          </span>
        </div>

        <h1
          className="text-2xl sm:text-4xl font-extrabold text-[#175057] leading-tight mb-4"
          dangerouslySetInnerHTML={{ __html: service.title.rendered }}
        />

        {excerpt && (
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {excerpt}
          </p>
        )}
      </header>

      {/* Cartões informativos de atendimento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
        <div className="flex items-start gap-3">
          <Clock size={20} className="text-[#3dc17a] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xs font-bold uppercase text-gray-500">Horário de Atendimento</h3>
            <p className="text-sm font-semibold text-gray-800">{siteConfig.contact.hours}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Building size={20} className="text-[#3dc17a] shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xs font-bold uppercase text-gray-500">Local de Atendimento</h3>
            <p className="text-sm font-semibold text-gray-800">{siteConfig.contact.address} — {siteConfig.contact.city} / TO</p>
          </div>
        </div>
      </div>

      {/* Conteúdo do Serviço se houver */}
      {content ? (
        <div className="prose prose-lg max-w-none mb-10">
          <ContentRenderer content={content} />
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-6 my-6 shadow-xs">
          <h2 className="text-lg font-bold text-[#175057] mb-3">Como solicitar este serviço</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Você pode protocolar sua demanda presencialmente na sede da Câmara Municipal ou encaminhar sua proposta através do sistema de Ouvidoria Oficial.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/ouvidoria/solicitacaoservico"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#3dc17a] hover:bg-[#2aac67] text-white font-bold text-sm rounded-md transition-colors"
            >
              <Send size={16} />
              <span>Enviar Solicitação Online</span>
            </a>
            <Link
              href="/servicos/"
              className="inline-flex items-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm rounded-md transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Voltar aos Serviços</span>
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}
