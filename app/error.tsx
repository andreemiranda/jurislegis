'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log apenas no console interno
    console.error('Erro na renderização da página:', error);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-200">
        <AlertTriangle size={40} />
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#175057] mb-3">
        Não foi possível carregar as informações
      </h1>

      <p className="text-base text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
        Ocorreu uma instabilidade momentânea na comunicação com o servidor de dados. Por favor, tente novamente em alguns instantes.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#175057] hover:bg-[#206870] text-white font-bold text-sm rounded-md shadow-sm transition-colors cursor-pointer"
        >
          <RotateCcw size={18} />
          <span>Tentar novamente</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm rounded-md transition-colors"
        >
          <Home size={18} />
          <span>Ir para o Início</span>
        </Link>
      </div>
    </div>
  );
}
