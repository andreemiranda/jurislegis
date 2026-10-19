'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Info, X, Search, ExternalLink } from 'lucide-react';
import { defaultMegaMenuData, MegaMenuData } from '../../config/mega-menu.data';

interface MegaMenuProps {
  data?: MegaMenuData;
}

export function MegaMenuAccessInfo({ data = defaultMegaMenuData }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Filtra itens se houver termo de busca
  const filterGroups = (groups: typeof data.col1) => {
    if (!searchTerm.trim()) return groups;
    const term = searchTerm.toLowerCase();

    return groups
      .map((g) => {
        const matchesGroup = g.grupo.toLowerCase().includes(term);
        const filteredModulos = g.modulos.filter(
          (m) => matchesGroup || m.nome.toLowerCase().includes(term)
        );
        return {
          ...g,
          modulos: filteredModulos,
        };
      })
      .filter((g) => g.modulos.length > 0);
  };

  const col1 = filterGroups(data.col1);
  const col2 = filterGroups(data.col2);
  const col3 = filterGroups(data.col3);
  const col4 = filterGroups(data.col4);

  return (
    <>
      {/* Botão de disparo no Header */}
      <div className="wp-block-araguaia-menu-access-information-2">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="trigger-item flex items-center gap-2 py-3 px-4 font-bold text-white transition-opacity hover:opacity-90"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          <Info size={22} className="text-white" />
          <span className="text text-sm uppercase tracking-wide">Acesso à Informação</span>
        </button>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mega-menu-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            ref={modalRef}
            className="menu-access-information-2-wrapper w-full max-w-7xl rounded-lg bg-gray-50 shadow-2xl overflow-hidden mt-6 animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Topo do Menu com busca e fechar */}
            <div className="top flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6 bg-white border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Info size={28} className="text-[#3dc17a]" />
                <h2 id="mega-menu-title" className="text-xl sm:text-2xl font-extrabold text-[#175057]">
                  {data.title}
                </h2>
              </div>

              {/* Busca interna do menu */}
              <div className="search-wrapper flex items-center bg-gray-100 rounded-md px-3 py-1.5 w-full sm:w-80">
                <Search size={18} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Filtrar serviços..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-sm w-full outline-hidden text-gray-800 placeholder-gray-500"
                  aria-label="Filtrar opções de acesso à informação"
                />
              </div>

              {/* Botão Fechar */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="close flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-red-600 cursor-pointer p-2"
                aria-label="Fechar menu"
              >
                <span>Fechar</span>
                <X size={24} />
              </button>
            </div>

            {/* Conteúdo com 4 colunas em grid */}
            <div className="bottom p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Coluna 1 */}
                <div className="col1 flex flex-col gap-6">
                  {col1.map((grupo, idx) => (
                    <div key={idx} className="grupo">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#175057] mb-2 px-1">
                        {grupo.grupo}
                      </h3>
                      <div className="modulos bg-white rounded-md border border-gray-200 divide-y divide-gray-100 shadow-xs">
                        {grupo.modulos.map((mod, mIdx) => (
                          <a
                            key={mIdx}
                            href={mod.link}
                            target={mod.link.startsWith('http') ? '_blank' : '_self'}
                            rel={mod.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="flex items-center justify-between p-3 text-sm text-gray-700 hover:bg-[#dff2e6] hover:text-[#2aac67] transition-colors"
                          >
                            <span>{mod.nome}</span>
                            {mod.link.startsWith('http') && (
                              <ExternalLink size={14} className="text-gray-400" />
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coluna 2 */}
                <div className="col2 flex flex-col gap-6">
                  {col2.map((grupo, idx) => (
                    <div key={idx} className="grupo">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#175057] mb-2 px-1">
                        {grupo.grupo}
                      </h3>
                      <div className="modulos bg-white rounded-md border border-gray-200 divide-y divide-gray-100 shadow-xs">
                        {grupo.modulos.map((mod, mIdx) => (
                          <a
                            key={mIdx}
                            href={mod.link}
                            target={mod.link.startsWith('http') ? '_blank' : '_self'}
                            rel={mod.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="flex items-center justify-between p-3 text-sm text-gray-700 hover:bg-[#dff2e6] hover:text-[#2aac67] transition-colors"
                          >
                            <span>{mod.nome}</span>
                            {mod.link.startsWith('http') && (
                              <ExternalLink size={14} className="text-gray-400" />
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coluna 3 */}
                <div className="col3 flex flex-col gap-6">
                  {col3.map((grupo, idx) => (
                    <div key={idx} className="grupo">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#175057] mb-2 px-1">
                        {grupo.grupo}
                      </h3>
                      <div className="modulos bg-white rounded-md border border-gray-200 divide-y divide-gray-100 shadow-xs">
                        {grupo.modulos.map((mod, mIdx) => (
                          <a
                            key={mIdx}
                            href={mod.link}
                            target={mod.link.startsWith('http') ? '_blank' : '_self'}
                            rel={mod.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="flex items-center justify-between p-3 text-sm text-gray-700 hover:bg-[#dff2e6] hover:text-[#2aac67] transition-colors"
                          >
                            <span>{mod.nome}</span>
                            {mod.link.startsWith('http') && (
                              <ExternalLink size={14} className="text-gray-400" />
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coluna 4 */}
                <div className="col4 flex flex-col gap-6">
                  {col4.map((grupo, idx) => (
                    <div key={idx} className="grupo">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#175057] mb-2 px-1">
                        {grupo.grupo}
                      </h3>
                      <div className="modulos bg-white rounded-md border border-gray-200 divide-y divide-gray-100 shadow-xs">
                        {grupo.modulos.map((mod, mIdx) => (
                          <a
                            key={mIdx}
                            href={mod.link}
                            target={mod.link.startsWith('http') ? '_blank' : '_self'}
                            rel={mod.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="flex items-center justify-between p-3 text-sm text-gray-700 hover:bg-[#dff2e6] hover:text-[#2aac67] transition-colors"
                          >
                            <span>{mod.nome}</span>
                            {mod.link.startsWith('http') && (
                              <ExternalLink size={14} className="text-gray-400" />
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
