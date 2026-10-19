import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Landmark, ArrowRight, Award } from 'lucide-react';

export function AboutCitySection() {
  return (
    <section className="wp-block-araguaia-about-city my-14 max-w-7xl mx-auto px-4" aria-labelledby="about-city-title">
      <div className="bg-linear-to-r from-[#175057] to-[#206870] rounded-2xl overflow-hidden shadow-xl text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Conteúdo textual */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-[#3dc17a] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-4">
              <MapPin size={14} />
              <span>Coração do Vale do Araguaia</span>
            </div>

            <h2 id="about-city-title" className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
              Conheça Paraíso do Tocantins
            </h2>

            <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-6">
              Paraíso do Tocantins é um dos mais dinâmicos polos econômicos e educacionais do estado.
              Fundada à margem da lendária Rodovia Belém-Brasília (BR-153) e aos pés da imponente Serra do Estrondo,
              a cidade destaca-se por sua hospitalidade, força agropecuária e comércio pujante.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-lg border border-white/10">
                <Landmark size={24} className="text-[#3dc17a] mb-2" />
                <h3 className="font-bold text-sm">História & Tradição</h3>
                <p className="text-xs text-white/75 mt-1">
                  Origens pioneiras com a expansão rodoviária no centro do país.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-lg border border-white/10">
                <Award size={24} className="text-[#3dc17a] mb-2" />
                <h3 className="font-bold text-sm">Símbolos Oficiais</h3>
                <p className="text-xs text-white/75 mt-1">
                  Brasão, Bandeira e Hino que celebram a identidade paraisense.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/historia/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#3dc17a] hover:bg-[#2aac67] text-white font-bold text-sm rounded-md shadow-md transition-colors"
              >
                <span>Conhecer a História</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/simbolos-municipais/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-bold text-sm rounded-md transition-colors border border-white/20"
              >
                <span>Símbolos Municipais</span>
              </Link>
            </div>
          </div>

          {/* Imagem representativa da Serra do Estrondo / Paraíso do Tocantins */}
          <div className="relative min-h-[300px] lg:min-h-full bg-gray-800">
            <Image
              src="/arquivos/2024/05/logo-paraios.png"
              alt="Paraíso do Tocantins"
              fill
              className="object-contain p-12 bg-[#123e44]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <p className="text-xs text-white/90 italic">
                Câmara Municipal de Paraíso do Tocantins — O Poder Legislativo a serviço de nossa gente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
