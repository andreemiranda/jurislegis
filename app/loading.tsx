import React from 'react';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[40vh]" role="status" aria-live="polite">
      <div className="w-12 h-12 border-4 border-[#d7ebee] border-t-[#206870] rounded-full animate-spin mb-4" />
      <span className="text-sm font-semibold text-[#175057]">
        Carregando informações institucionais...
      </span>
      <span className="screen-reader-text">Aguarde, carregando conteúdo</span>
    </div>
  );
}
