'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { rewriteUrl } from '../../lib/links/rewrite';

export interface BannerSlide {
  id: number | string;
  title: string;
  imageUrl: string;
  link?: string;
}

interface BannerSliderProps {
  slides?: BannerSlide[];
}

const defaultSlides: BannerSlide[] = [
  {
    id: 1,
    title: 'Portal Oficial da Câmara Municipal de Paraíso do Tocantins',
    imageUrl: '/arquivos/2024/05/FullBanner-paraisodotocantins.png',
    link: '#',
  },
];

export function BannerSlider({ slides = defaultSlides }: BannerSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeSlides = slides.length > 0 ? slides : defaultSlides;

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeSlides.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const current = activeSlides[currentIndex];
  const rewrittenImage = rewriteUrl(current.imageUrl).url;

  return (
    <div
      className="wp-block-araguaia-banner relative w-full overflow-hidden bg-gray-100 rounded-lg shadow-md my-4 max-w-7xl mx-auto"
      style={{ minHeight: '340px' }}
      role="region"
      aria-label="Destaques e Banners da Câmara"
    >
      <div className="relative w-full h-[240px] sm:h-[340px] md:h-[420px] lg:h-[450px]">
        {activeSlides.map((slide, index) => {
          const isCurrent = index === currentIndex;
          const imgUrl = rewriteUrl(slide.imageUrl).url;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isCurrent ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={imgUrl}
                alt={slide.title || 'Banner da Câmara'}
                fill
                priority={index === 0}
                className="object-cover object-center"
                referrerPolicy="no-referrer"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
              />
            </div>
          );
        })}
      </div>

      {/* Setas de navegação (se mais de 1 slide) */}
      {activeSlides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            aria-label="Próximo slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicadores de bolinha */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {activeSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === currentIndex ? 'w-8 bg-[#3dc17a]' : 'w-2.5 bg-white/70'
                }`}
                aria-label={`Ir para slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
