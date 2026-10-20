import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Phone, Clock, MapPin } from 'lucide-react';
import { siteConfig } from '../../config/site.config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="wp-block-template-part bg-[#175057] text-white mt-12 border-t-4 border-[#3dc17a]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/20">
          {/* Coluna 1: Informações de Contato e Redes */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {/* Redes Sociais com fundo verde institucional */}
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-sm bg-[#3dc17a] hover:bg-[#2aac67] flex items-center justify-center text-white transition-colors"
                aria-label="Facebook da Câmara"
              >
                <Facebook size={18} />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-sm bg-[#3dc17a] hover:bg-[#2aac67] flex items-center justify-center text-white transition-colors"
                aria-label="Instagram da Câmara"
              >
                <Instagram size={18} />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-sm bg-[#3dc17a] hover:bg-[#2aac67] flex items-center justify-center text-white transition-colors"
                aria-label="YouTube da Câmara"
              >
                <Youtube size={18} />
              </a>
            </div>

            <div className="space-y-3 text-sm text-white/90">
              <div className="flex items-start gap-2">
                <Phone size={18} className="text-[#3dc17a] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Fone: </strong>
                  <span>{siteConfig.contact.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock size={18} className="text-[#3dc17a] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Atendimento: </strong>
                  <span>{siteConfig.contact.hours}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-[#3dc17a] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Endereço: </strong>
                  <span>
                    {siteConfig.contact.address} — {siteConfig.contact.city} - {siteConfig.contact.state} — CEP {siteConfig.contact.cep}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 2: Institucional & Secretarias */}
          <div className="border-l-2 border-[#3dc17a] pl-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Institucional
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/estrutura-organizacional/" className="hover:text-white hover:underline transition-colors">
                  Estrutura Organizacional
                </Link>
              </li>
              <li>
                <Link href="/mesa-diretora/" className="hover:text-white hover:underline transition-colors">
                  Mesa Diretora
                </Link>
              </li>
              <li>
                <Link href="/comissoes-permanentes/" className="hover:text-white hover:underline transition-colors">
                  Comissões Permanentes
                </Link>
              </li>
              <li>
                <Link href="/#vereadores" className="hover:text-white hover:underline transition-colors">
                  Vereadores em Exercício
                </Link>
              </li>
              <li>
                <Link href="/historia/" className="hover:text-white hover:underline transition-colors">
                  História do Município
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Ouvidoria e Cidadão */}
          <div className="border-l-2 border-[#3dc17a] pl-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">
              Ouvidoria & Transparência
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a
                  href="https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/ouvidoria/inicio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Portal da Ouvidoria
                </a>
              </li>
              <li>
                <a
                  href="https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/ouvidoria/denuncia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Canal de Denúncias
                </a>
              </li>
              <li>
                <a
                  href="https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/informacao/sic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline transition-colors"
                >
                  e-SIC (Informação ao Cidadão)
                </a>
              </li>
              <li>
                <Link href="/servicos/" className="hover:text-white hover:underline transition-colors">
                  Carta de Serviços
                </Link>
              </li>
              <li>
                <Link href="/fale-conosco/" className="hover:text-white hover:underline transition-colors">
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé inferior / Direitos Autorais */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <p>
            {currentYear} © {siteConfig.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/acessibilidade/" className="hover:text-white transition-colors">
              Acessibilidade
            </Link>
            <span>•</span>
            <Link href="/mapa-do-site/" className="hover:text-white transition-colors">
              Mapa do Site
            </Link>
            <span>•</span>
            <Link
              href="/api/sync"
              target="_blank"
              className="hover:text-white transition-colors text-[11px] text-white/70 flex items-center gap-1.5"
              title="Status da sincronização com a API REST do WordPress"
            >
              <span className="w-2 h-2 rounded-full bg-[#3dc17a] inline-block shadow-xs" />
              <span>Sincronizado</span>
            </Link>
            <span>•</span>
            <a
              href="https://nucleogov.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors font-semibold"
            >
              NúcleoGov
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
