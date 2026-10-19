import React from 'react';
import Link from 'next/link';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-[#d7ebee] text-[#175057] rounded-full flex items-center justify-center mx-auto mb-6">
        <FileQuestion size={40} />
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#175057] mb-3">
        Página não encontrada
      </h1>

      <p className="text-base text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
        O conteúdo que você procurava não está disponível, foi movido ou o endereço digitado está incorreto.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#175057] hover:bg-[#206870] text-white font-bold text-sm rounded-md shadow-sm transition-colors"
        >
          <Home size={18} />
          <span>Ir para a Página Inicial</span>
        </Link>
        <Link
          href="/servicos/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm rounded-md transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Ver Carta de Serviços</span>
        </Link>
      </div>
    </div>
  );
}
