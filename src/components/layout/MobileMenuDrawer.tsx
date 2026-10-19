'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Search, Facebook, Instagram, Youtube, Eye } from 'lucide-react';
import { mainNavItems } from './Navigation';
import { siteConfig } from '../../config/site.config';

export function MobileMenuDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?s=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="lg:hidden">
      {/* Botão Hamburger */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-2 text-white hover:bg-[#2e6167] rounded-md transition-colors"
        aria-label="Abrir menu de navegação móvel"
        aria-expanded={isOpen}
      >
        <Menu size={28} />
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="w-full max-w-sm h-full bg-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            {/* Cabeçalho do Drawer */}
            <div className="flex items-center justify-between p-4 bg-[#175057] text-white">
              <span className="font-bold text-base">Menu Principal</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[#2e6167] rounded-sm transition-colors"
                aria-label="Fechar menu móvel"
              >
                <X size={24} />
              </button>
            </div>

            {/* Busca no Drawer */}
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <form onSubmit={handleSearchSubmit} className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
                <Search size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Buscar no portal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm outline-hidden text-gray-800"
                />
              </form>
            </div>

            {/* Links do Menu com Accordion */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {mainNavItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isSubmenuOpen = openSubmenu === item.label;

                if (hasChildren) {
                  return (
                    <div key={item.label} className="border-b border-gray-100 py-1">
                      <button
                        type="button"
                        onClick={() => toggleSubmenu(item.label)}
                        className="flex items-center justify-between w-full py-2.5 px-3 text-left font-semibold text-gray-800 hover:text-[#175057]"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {isSubmenuOpen && (
                        <div className="pl-4 pr-2 py-1 space-y-1 bg-gray-50 rounded-md">
                          {item.children?.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className="block py-2 px-2 text-sm text-gray-600 hover:text-[#175057] hover:bg-gray-100 rounded-sm"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={item.label} className="border-b border-gray-100 py-1">
                    {item.href.startsWith('http') ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-2.5 px-3 font-semibold text-gray-800 hover:text-[#175057]"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-2.5 px-3 font-semibold text-gray-800 hover:text-[#175057]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Redes Sociais no rodapé do drawer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-around">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#175057] hover:bg-gray-200 rounded-full"
                aria-label="Facebook da Câmara"
              >
                <Facebook size={20} />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#175057] hover:bg-gray-200 rounded-full"
                aria-label="Instagram da Câmara"
              >
                <Instagram size={20} />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#175057] hover:bg-gray-200 rounded-full"
                aria-label="YouTube da Câmara"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
