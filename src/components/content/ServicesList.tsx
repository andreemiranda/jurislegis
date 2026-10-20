'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from './Breadcrumbs';
import {
  FileText,
  Search,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  CheckCircle,
  Building,
} from 'lucide-react';
import { rewriteUrl } from '../../lib/links/rewrite';

interface ServicesListProps {
  services: any[];
}

const defaultInstitutionalServices = [
  {
    id: 1,
    title: 'Sugestões de Propostas Legislativas',
    excerpt: 'Envio de sugestões de projetos de lei, requerimentos e proposições para a apreciação dos vereadores.',
    link: '/servico/sugestoes-de-propostas-legislativas/',
    icon: 'file-text',
  },
  {
    id: 2,
    title: 'Consultar Matrícula e Folha de Servidores',
    excerpt: 'Consulta pública ao quadro funcional, cargos, remunerações e atos de pessoal da Câmara.',
    link: 'https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/folhadepagamento/servidores',
    icon: 'search',
    isExternal: true,
  },
  {
    id: 3,
    title: 'Ouvidoria e Atendimento ao Cidadão',
    excerpt: 'Canal direto para envio de solicitações, pedidos de informação, denúncias, elogios e reclamações.',
    link: 'https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/ouvidoria/inicio',
    icon: 'help-circle',
    isExternal: true,
  },
  {
    id: 4,
    title: 'Serviço de Informação ao Cidadão (e-SIC)',
    excerpt: 'Solicitação de acesso a informações e documentos públicos conforme as disposições da Lei Federal 12.527/2011.',
    link: 'https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/informacao/sic',
    icon: 'building',
    isExternal: true,
  },
];

export function ServicesList({ services = [] }: ServicesListProps) {
  const [query, setQuery] = useState('');

  // Unifica serviços da API com os serviços institucionais padrão
  const allServices = services.length > 0
    ? services.map((s) => ({
        id: s.id,
        title: s.title?.rendered?.replace(/<[^>]+>/g, '') || 'Serviço',
        excerpt: s.excerpt?.rendered?.replace(/<[^>]+>/g, '') || 'Serviço ao cidadão da Câmara Municipal.',
        link: rewriteUrl(s.link).url,
        isExternal: s.link?.startsWith('http') && !s.link.includes('paraisodotocantins.to.leg.br'),
      }))
    : defaultInstitutionalServices;

  const filtered = allServices.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.excerpt.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ name: 'Serviços ao Cidadão', url: '/servicos/' }]} />

      <header className="mb-8 pb-4 border-b-2 border-gray-100 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#3dc17a] uppercase tracking-wider block mb-1">
            Carta de Serviços
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#175057]">
            Serviços da Câmara Municipal
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Consulte os serviços disponibilizados pelo Poder Legislativo de Paraíso do Tocantins aos cidadãos, entidades e servidores.
          </p>
        </div>

        {/* Busca de Serviços */}
        <div className="w-full md:w-72">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Buscar serviço..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm outline-hidden text-gray-800"
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const card = (
            <div className="bg-white rounded-xl border border-gray-200/90 p-6 shadow-xs hover:shadow-md hover:border-[#3dc17a] transition-all duration-200 flex flex-col h-full group">
              <div className="w-12 h-12 rounded-lg bg-[#d7ebee] text-[#175057] group-hover:bg-[#3dc17a] group-hover:text-white flex items-center justify-center mb-4 transition-colors">
                <FileText size={24} />
              </div>

              <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#175057] transition-colors mb-2 leading-snug">
                {item.title}
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                {item.excerpt}
              </p>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#206870] group-hover:text-[#3dc17a] transition-colors mt-auto">
                <span>{item.isExternal ? 'Acessar serviço no portal' : 'Ver informações e solicitar'}</span>
                {item.isExternal ? <ExternalLink size={14} /> : <ArrowRight size={14} />}
              </div>
            </div>
          );

          return item.isExternal ? (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {card}
            </a>
          ) : (
            <Link key={item.id} href={item.link} className="block">
              {card}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
