'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Facebook, Instagram, Youtube } from 'lucide-react';
import { Navigation } from './Navigation';
import { MegaMenuAccessInfo } from './MegaMenuAccessInfo';
import { MobileMenuDrawer } from './MobileMenuDrawer';
import { siteConfig } from '../../config/site.config';

export function Header() {
  const [searchVal, setSearchVal] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      window.location.href = `/?s=${encodeURIComponent(searchVal.trim())}`;
    }
  };

  return (
    <header className="wp-block-template-part w-full" role="banner">
      {/* Skip to main content link for WCAG accessibility */}
      <a href="#conteudo-principal" className="screen-reader-text">
        Pular para o conteúdo principal
      </a>

      <div className="bg-[#175057] text-white px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          {/* Top Bar Desktop */}
          <div className="hidden lg:flex items-center justify-between gap-6">
            {/* Esquerda: Busca e Redes Sociais */}
            <div className="flex items-center gap-3">
              {/* Busca rápida */}
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-[#2e6167] rounded-sm px-4 py-2 w-64 text-white"
                role="search"
              >
                <Search size={18} className="text-white/80 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Buscar no site"
                  name="s"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="bg-transparent text-sm w-full outline-hidden text-white placeholder-white/70"
                  aria-label="Buscar no site"
                />
              </form>

              {/* Redes Sociais */}
              <div className="flex items-center bg-[#2e6167] rounded-sm overflow-hidden divide-x divide-[#175057]">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-white hover:bg-[#3dc17a] transition-colors"
                  aria-label="Facebook da Câmara Municipal"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-white hover:bg-[#3dc17a] transition-colors"
                  aria-label="Instagram da Câmara Municipal"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-white hover:bg-[#3dc17a] transition-colors"
                  aria-label="YouTube da Câmara Municipal"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </div>

            {/* Centro: Brasão e Logo Oficial da Câmara */}
            <div className="flex justify-center">
              <Link href="/" className="inline-block" aria-label="Ir para a página inicial">
                <Image
                  src={siteConfig.logo.src}
                  alt={siteConfig.logo.alt}
                  width={261}
                  height={78}
                  priority
                  className="h-16 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </Link>
            </div>

            {/* Direita: Mega Menu Acesso à Informação */}
            <div className="flex items-center justify-end">
              <MegaMenuAccessInfo />
            </div>
          </div>

          {/* Top Bar Mobile */}
          <div className="flex lg:hidden items-center justify-between">
            <Link href="/" className="inline-block" aria-label="Ir para a página inicial">
              <Image
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                width={180}
                height={54}
                priority
                className="h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </Link>

            <div className="flex items-center gap-2">
              <MegaMenuAccessInfo />
              <MobileMenuDrawer />
            </div>
          </div>

          {/* Linha separadora discreta */}
          <hr className="border-t border-white/10 my-1 hidden lg:block" />

          {/* Menu de navegação principal desktop */}
          <Navigation />
        </div>
      </div>
    </header>
  );
}
