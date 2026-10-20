import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from './Breadcrumbs';
import {
  Compass,
  Home,
  Building,
  Users,
  Video,
  FileText,
  Briefcase,
  Layers,
  MapPin,
  ExternalLink,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { mainNavItems } from '../layout/Navigation';
import { vereadoresList } from '../../config/vereadores.data';

export function MapaDoSitePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ name: 'Mapa do Site', url: '/mapa-do-site/' }]} />

      <header className="mb-10 pb-4 border-b-2 border-gray-100">
        <span className="text-xs font-bold text-[#3dc17a] uppercase tracking-wider block mb-1">
          Navegação Estruturada
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#175057]">
          Mapa do Site
        </h1>
        <p className="text-sm text-gray-600 mt-1 max-w-2xl">
          Índice hierárquico com todas as páginas, arquivos institucionais, sessões plenárias, serviços e canais do portal da Câmara Municipal.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* 1. Institucional */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2 text-[#175057] font-bold text-lg mb-4 pb-2 border-b border-gray-100">
            <Building size={20} className="text-[#3dc17a]" />
            <h2>Institucional</h2>
          </div>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/" className="text-gray-700 hover:text-[#206870] hover:underline flex items-center gap-1.5 font-medium">
                <Home size={14} className="text-gray-400" />
                <span>Página Inicial</span>
              </Link>
            </li>
            <li>
              <Link href="/mesa-diretora/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Mesa Diretora
              </Link>
            </li>
            <li>
              <Link href="/estrutura-organizacional/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Estrutura Organizacional
              </Link>
            </li>
            <li>
              <Link href="/o-papel-do-vereador/" className="text-gray-700 hover:text-[#206870] hover:underline">
                O Papel do Vereador
              </Link>
            </li>
            <li>
              <Link href="/o-papel-da-camara/" className="text-gray-700 hover:text-[#206870] hover:underline">
                O Papel da Câmara
              </Link>
            </li>
          </ul>
        </div>

        {/* 2. Vereadores */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2 text-[#175057] font-bold text-lg mb-4 pb-2 border-b border-gray-100">
            <Users size={20} className="text-[#3dc17a]" />
            <h2>Vereadores ({vereadoresList.length})</h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm max-h-72 overflow-y-auto pr-2">
            {vereadoresList.map((v) => (
              <li key={v.slug}>
                <Link
                  href={`/vereador/${v.slug}/`}
                  className="text-gray-700 hover:text-[#206870] hover:underline block truncate"
                >
                  {v.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Notícias e Comunicação */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2 text-[#175057] font-bold text-lg mb-4 pb-2 border-b border-gray-100">
            <FileText size={20} className="text-[#3dc17a]" />
            <h2>Notícias e Publicações</h2>
          </div>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/noticias/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Todas as Notícias
              </Link>
            </li>
            <li>
              <Link href="/categoria/noticias/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Arquivo de Notícias
              </Link>
            </li>
            <li>
              <Link href="/avisos/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Avisos e Editais Oficiais
              </Link>
            </li>
            <li>
              <Link href="/feed" className="text-gray-700 hover:text-[#206870] hover:underline">
                Feed RSS de Publicações
              </Link>
            </li>
          </ul>
        </div>

        {/* 4. Sessões e TV Câmara */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2 text-[#175057] font-bold text-lg mb-4 pb-2 border-b border-gray-100">
            <Video size={20} className="text-[#3dc17a]" />
            <h2>TV Câmara & Sessões</h2>
          </div>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/transmissao-das-sessoes/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Transmissão das Sessões ao Vivo
              </Link>
            </li>
            <li>
              <Link href="/videos/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Acervo de Gravações
              </Link>
            </li>
            <li>
              <a
                href="https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/atos_adm/mp/id=6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#206870] hover:underline inline-flex items-center gap-1"
              >
                <span>Pautas e Atas das Sessões</span>
                <ExternalLink size={12} className="text-gray-400" />
              </a>
            </li>
          </ul>
        </div>

        {/* 5. Comissões Permanentes */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2 text-[#175057] font-bold text-lg mb-4 pb-2 border-b border-gray-100">
            <Layers size={20} className="text-[#3dc17a]" />
            <h2>Comissões Permanentes</h2>
          </div>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/comissoes-permanentes/" className="text-gray-700 hover:text-[#206870] hover:underline font-medium">
                Página Geral das Comissões
              </Link>
            </li>
            <li>
              <Link href="/comissoes-permanentes/comissao-de-constituicao-e-justica/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Comissão de Constituição e Justiça
              </Link>
            </li>
            <li>
              <Link href="/comissoes-permanentes/comissao-de-financas-e-orcamento/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Comissão de Finanças e Orçamento
              </Link>
            </li>
            <li>
              <Link href="/comissoes-permanentes/comissao-de-educacao-e-cultura/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Comissão de Educação e Cultura
              </Link>
            </li>
            <li>
              <Link href="/comissoes-permanentes/comissao-de-obras-e-servicos-publicos/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Comissão de Obras e Serviços Públicos
              </Link>
            </li>
            <li>
              <Link href="/comissoes-permanentes/comissao-de-agricultura/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Comissão de Agricultura
              </Link>
            </li>
            <li>
              <Link href="/comissoes-permanentes/comissao-de-saude-publica-e-assistencia-social/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Comissão de Saúde e Assistência
              </Link>
            </li>
          </ul>
        </div>

        {/* 6. A Cidade & Turismo */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2 text-[#175057] font-bold text-lg mb-4 pb-2 border-b border-gray-100">
            <MapPin size={20} className="text-[#3dc17a]" />
            <h2>A Cidade</h2>
          </div>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/historia/" className="text-gray-700 hover:text-[#206870] hover:underline">
                História de Paraíso do Tocantins
              </Link>
            </li>
            <li>
              <Link href="/simbolos-municipais/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Símbolos Municipais
              </Link>
            </li>
            <li>
              <Link href="/dados-ibge/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Dados IBGE
              </Link>
            </li>
            <li>
              <Link href="/localizacao/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Localização e Geografia
              </Link>
            </li>
            <li>
              <Link href="/galeria-de-fotos/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Galeria de Fotos
              </Link>
            </li>
          </ul>
        </div>

        {/* 7. Serviços ao Cidadão */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2 text-[#175057] font-bold text-lg mb-4 pb-2 border-b border-gray-100">
            <Briefcase size={20} className="text-[#3dc17a]" />
            <h2>Serviços ao Cidadão</h2>
          </div>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/servicos/" className="text-gray-700 hover:text-[#206870] hover:underline font-medium">
                Carta Geral de Serviços
              </Link>
            </li>
            <li>
              <Link href="/servico/sugestoes-de-propostas-legislativas/" className="text-gray-700 hover:text-[#206870] hover:underline">
                Sugestões de Propostas Legislativas
              </Link>
            </li>
            <li>
              <a
                href="https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/folhadepagamento/servidores"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#206870] hover:underline inline-flex items-center gap-1"
              >
                <span>Consulta de Servidores e Folha</span>
                <ExternalLink size={12} className="text-gray-400" />
              </a>
            </li>
          </ul>
        </div>

        {/* 8. Transparência Pública */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2 text-[#175057] font-bold text-lg mb-4 pb-2 border-b border-gray-100">
            <Shield size={20} className="text-[#3dc17a]" />
            <h2>Transparência Pública</h2>
          </div>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href="https://acessoainformacao.paraisodotocantins.to.leg.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#206870] hover:underline inline-flex items-center gap-1 font-medium"
              >
                <span>Portal da Transparência</span>
                <ExternalLink size={12} className="text-gray-400" />
              </a>
            </li>
            <li>
              <a
                href="https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/transparencia/cntdespesas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#206870] hover:underline inline-flex items-center gap-1"
              >
                <span>Despesas e Pagamentos</span>
                <ExternalLink size={12} className="text-gray-400" />
              </a>
            </li>
            <li>
              <a
                href="https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/informacao/licitacoes_cnt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#206870] hover:underline inline-flex items-center gap-1"
              >
                <span>Licitações e Contratos</span>
                <ExternalLink size={12} className="text-gray-400" />
              </a>
            </li>
            <li>
              <a
                href="https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/informacao/sic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#206870] hover:underline inline-flex items-center gap-1"
              >
                <span>Serviço de Informação (e-SIC)</span>
                <ExternalLink size={12} className="text-gray-400" />
              </a>
            </li>
          </ul>
        </div>

        {/* 9. Atendimento & Acessibilidade */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2 text-[#175057] font-bold text-lg mb-4 pb-2 border-b border-gray-100">
            <HelpCircle size={20} className="text-[#3dc17a]" />
            <h2>Atendimento & Acessibilidade</h2>
          </div>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/fale-conosco/" className="text-gray-700 hover:text-[#206870] hover:underline font-medium">
                Fale Conosco
              </Link>
            </li>
            <li>
              <Link href="/acessibilidade/" className="text-gray-700 hover:text-[#206870] hover:underline font-medium">
                Declaração de Acessibilidade
              </Link>
            </li>
            <li>
              <a
                href="https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/ouvidoria/inicio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#206870] hover:underline inline-flex items-center gap-1"
              >
                <span>Ouvidoria Geral</span>
                <ExternalLink size={12} className="text-gray-400" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
