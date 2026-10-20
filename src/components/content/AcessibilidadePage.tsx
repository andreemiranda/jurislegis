import React from 'react';
import Link from 'next/link';
import { Breadcrumbs } from './Breadcrumbs';
import {
  Eye,
  Keyboard,
  ZoomIn,
  Contrast,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
} from 'lucide-react';
import { siteConfig } from '../../config/site.config';

export function AcessibilidadePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ name: 'Acessibilidade', url: '/acessibilidade/' }]} />

      <header className="mb-8 pb-4 border-b-2 border-gray-100">
        <span className="text-xs font-bold text-[#3dc17a] uppercase tracking-wider block mb-1">
          Inclusão e Cidadania Digital
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#175057]">
          Declaração de Acessibilidade
        </h1>
        <p className="text-sm text-gray-600 mt-1 max-w-2xl">
          Conheça as diretrizes e os recursos de acessibilidade disponibilizados no portal da Câmara Municipal de Paraíso do Tocantins.
        </p>
      </header>

      <div className="space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <h2 className="text-lg font-bold text-[#175057] mb-3 flex items-center gap-2">
            <CheckCircle2 size={20} className="text-[#3dc17a]" />
            <span>Padrões e Conformidade</span>
          </h2>
          <p className="mb-3">
            O portal da Câmara Municipal de Paraíso do Tocantins foi desenvolvido observando as diretrizes do <strong>e-MAG (Modelo de Acessibilidade em Governo Eletrônico)</strong>, em consonância com as recomendações internacionais da <strong>WCAG 2.1 (Web Content Accessibility Guidelines)</strong> do W3C.
          </p>
          <p>
            O objetivo é garantir que todas as pessoas, incluindo idosos e pessoas com deficiência visual, motora, auditiva ou cognitiva, tenham pleno acesso às informações legislativas e serviços públicos.
          </p>
        </section>

        {/* Teclas de Atalho */}
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <h2 className="text-lg font-bold text-[#175057] mb-3 flex items-center gap-2">
            <Keyboard size={20} className="text-[#3dc17a]" />
            <span>Teclas de Atalho (Accesskeys)</span>
          </h2>
          <p className="mb-4">
            Você pode navegar rapidamente pelas principais seções do portal utilizando combinações de teclado:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-800 border-b border-gray-200">
                  <th className="py-2.5 px-3 font-bold">Atalho</th>
                  <th className="py-2.5 px-3 font-bold">Função</th>
                  <th className="py-2.5 px-3 font-bold">Como Acionar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-2 px-3 font-mono font-bold text-[#175057]">Alt + 1</td>
                  <td className="py-2 px-3">Ir para o conteúdo principal</td>
                  <td className="py-2 px-3 text-xs text-gray-500">Pula o cabeçalho direto para a matéria ou lista</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono font-bold text-[#175057]">Alt + 2</td>
                  <td className="py-2 px-3">Ir para o menu de navegação</td>
                  <td className="py-2 px-3 text-xs text-gray-500">Foca na barra de navegação principal</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono font-bold text-[#175057]">Alt + 3</td>
                  <td className="py-2 px-3">Ir para o campo de busca</td>
                  <td className="py-2 px-3 text-xs text-gray-500">Abre e foca na pesquisa do portal</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono font-bold text-[#175057]">Alt + 4</td>
                  <td className="py-2 px-3">Ir para o rodapé</td>
                  <td className="py-2 px-3 text-xs text-gray-500">Leva ao final da página com dados de contato</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            * Em computadores Mac, utilize a combinação <kbd className="px-1.5 py-0.5 bg-gray-100 border rounded-sm font-mono">Ctrl + Option + [Número]</kbd>.
          </p>
        </section>

        {/* Recursos Visuais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="text-base font-bold text-[#175057] mb-2 flex items-center gap-2">
              <Contrast size={18} className="text-[#3dc17a]" />
              <span>Alto Contraste</span>
            </h3>
            <p className="text-sm text-gray-600">
              No topo da página ou na barra lateral de acessibilidade, clique no botão <strong>Alto Contraste</strong> para inverter o esquema cromático para fundo escuro com tipografia de alto contraste (#ffff00 e #ffffff), ideal para baixa visão.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
            <h3 className="text-base font-bold text-[#175057] mb-2 flex items-center gap-2">
              <ZoomIn size={18} className="text-[#3dc17a]" />
              <span>Redimensionamento de Fonte</span>
            </h3>
            <p className="text-sm text-gray-600">
              Utilize os controles <strong>A+</strong> e <strong>A-</strong> na barra de acessibilidade para ampliar ou reduzir o tamanho dos textos de acordo com sua preferência, sem quebrar o layout da página.
            </p>
          </div>
        </div>

        {/* Contato para Dificuldades de Acessibilidade */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg font-bold text-[#175057] mb-2">
            Relatar Barreiras de Acessibilidade
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Se você encontrou alguma barreira técnica ou tem sugestões para aprimorar a acessibilidade deste portal, entre em contato com nossa equipe:
          </p>
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-[#175057]">
            <span className="flex items-center gap-1.5">
              <Phone size={15} className="text-[#3dc17a]" />
              <span>{siteConfig.contact.phone}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={15} className="text-[#3dc17a]" />
              <span>{siteConfig.contact.email}</span>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
