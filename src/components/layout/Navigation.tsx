'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
}

export const mainNavItems: NavItem[] = [
  { label: 'Início', href: '/' },
  {
    label: 'Institucional',
    href: '/estrutura-organizacional/',
    children: [
      { label: 'Mesa Diretora', href: '/mesa-diretora/' },
      { label: 'Estrutura Organizacional', href: '/estrutura-organizacional/' },
      { label: 'O Papel do Vereador', href: '/o-papel-do-vereador/' },
      { label: 'O Papel da Câmara', href: '/o-papel-da-camara/' },
    ],
  },
  {
    label: 'A Cidade',
    href: '/historia/',
    children: [
      { label: 'História', href: '/historia/' },
      { label: 'Símbolos Municipais', href: '/simbolos-municipais/' },
      { label: 'Dados IBGE', href: '/dados-ibge/' },
      { label: 'Localização', href: '/localizacao/' },
      { label: 'Galeria de Fotos', href: '/galeria-de-fotos/' },
      { label: 'Galeria de Vídeos', href: '/videos/' },
    ],
  },
  {
    label: 'Vereadores',
    href: '/#vereadores',
    children: [
      { label: 'Ricardo Silva Diniz', href: '/vereador/ricardo-silva-diniz/' },
      { label: 'Silvana Pereira da Luz', href: '/vereador/silvana-pereira-da-luz/' },
      { label: 'Adriana Souto Oliveira Câmara', href: '/vereador/adriana-souto-oliveira-camara/' },
      { label: 'Jozival Rodrigues Barboza', href: '/vereador/jozival-rodrigues/' },
      { label: 'Walter Gontijo de Oliveira', href: '/vereador/walter-gontijo-de-oliveira/' },
      { label: 'Vanderley José de Oliveira', href: '/vereador/vanderley-jose-de-oliveira/' },
      { label: 'Marcilio Pereira dos Santos', href: '/vereador/marcilio-pereira-dos-santos/' },
      { label: 'João Gomes Camargo', href: '/vereador/joao-gomes-camargo/' },
      { label: 'Gleidson Monteiro Vasconcelos', href: '/vereador/gleidson-monteiro-vasconcelos/' },
      { label: 'Alailson Lemos Pereira', href: '/vereador/alailson-lemos-pereira/' },
      { label: 'Amiron José Pinto', href: '/vereador/amiron-jose-pinto/' },
      { label: 'Cleidimar da Silva Fernandes', href: '/vereador/cleidimar-da-silva-fernandes/' },
      { label: 'Flávio Eliziario de Souza', href: '/vereador/flavio-eliziario-de-souza/' },
      { label: 'Marlene Moraes Santos', href: '/vereador/marlene-moraes-santos/' },
      { label: 'Nilson Maria Catarino', href: '/vereador/nilson-maria-catarino/' },
    ],
  },
  {
    label: 'Comissões',
    href: '/comissoes-permanentes/',
    children: [
      {
        label: 'Comissão de Constituição, Legislação, Justiça e Redação Final',
        href: '/comissoes-permanentes/comissao-de-constituicao-e-justica/',
      },
      {
        label: 'Comissão de Finanças, Orçamento, Tributação, Fiscalização e Controle',
        href: '/comissoes-permanentes/comissao-de-financas-e-orcamento/',
      },
      {
        label: 'Comissão de Educação, Ciência, Comunicação, Cultura e Desporto',
        href: '/comissoes-permanentes/comissao-de-educacao-e-cultura/',
      },
      {
        label: 'Comissão de Transportes, Tecnologia, Obras e Serviços Públicos',
        href: '/comissoes-permanentes/comissao-de-obras-e-servicos-publicos/',
      },
      {
        label: 'Comissão de Agricultura e Meio Ambiente',
        href: '/comissoes-permanentes/comissao-de-agricultura/',
      },
      {
        label: 'Comissão de Saúde e Assistência Social',
        href: '/comissoes-permanentes/comissao-de-saude-publica-e-assistencia-social/',
      },
      {
        label: 'Comissão de Indústria e Comercio',
        href: '/comissoes-permanentes/comissao-de-industria-e-comercio/',
      },
    ],
  },
  { label: 'Transparência', href: 'https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/transparencia/inicio' },
  { label: 'Serviços', href: '/servicos/' },
  { label: 'Fale Conosco', href: '/fale-conosco/' },
];

export function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav
      aria-label="Menu principal de navegação"
      className="has-text-color has-white-color wp-block-navigation is-style-hdr-03 hidden lg:block"
    >
      <ul className="flex flex-wrap items-center justify-between gap-1 py-1 font-bold text-base text-white">
        {mainNavItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isExternal = item.href.startsWith('http');

          if (hasChildren) {
            const isOpen = activeDropdown === item.label;

            return (
              <li
                key={item.label}
                className="relative group py-2"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center gap-1 cursor-pointer px-3 py-1.5 rounded-sm hover:bg-[#2e6167] transition-colors">
                  <Link href={item.href} className="text-white hover:text-white">
                    {item.label}
                  </Link>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </div>

                {isOpen && (
                  <ul className="absolute left-0 top-full mt-1 min-w-[240px] max-w-[340px] bg-white text-gray-800 rounded-md shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {item.children?.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#dff2e6] hover:text-[#175057] transition-colors font-medium"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          }

          return (
            <li key={item.label} className="py-2">
              {isExternal ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-white hover:bg-[#2e6167] rounded-sm transition-colors block"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="px-3 py-1.5 text-white hover:bg-[#2e6167] rounded-sm transition-colors block"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
