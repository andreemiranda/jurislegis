import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // ex: '/categoria/noticias' ou ''
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    const cleanBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
    if (page === 1) {
      return cleanBase || '/';
    }
    return `${cleanBase}/page/${page}`;
  };

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Mostra até 5 números de página centrados
  const pages: number[] = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav
      aria-label="Navegação da paginação"
      className="flex items-center justify-center gap-1.5 my-12"
    >
      {hasPrev ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          rel="prev"
          className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          aria-label="Página anterior"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Anterior</span>
        </Link>
      ) : (
        <span
          className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-300 bg-gray-50 border border-gray-200 rounded-md cursor-not-allowed"
          aria-disabled="true"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Anterior</span>
        </span>
      )}

      {pages.map((p) => {
        const isCurrent = p === currentPage;
        return isCurrent ? (
          <span
            key={p}
            aria-current="page"
            className="px-3.5 py-2 text-sm font-bold text-white bg-[#175057] border border-[#175057] rounded-md shadow-xs"
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={getPageUrl(p)}
            className="px-3.5 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {p}
          </Link>
        );
      })}

      {hasNext ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          rel="next"
          className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          aria-label="Próxima página"
        >
          <span className="hidden sm:inline">Próxima</span>
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span
          className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-300 bg-gray-50 border border-gray-200 rounded-md cursor-not-allowed"
          aria-disabled="true"
        >
          <span className="hidden sm:inline">Próxima</span>
          <ChevronRight size={16} />
        </span>
      )}
    </nav>
  );
}
