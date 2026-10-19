import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbJsonLd } from '../../lib/seo/jsonld';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [
    { name: 'Início', url: '/' },
    ...items,
  ];

  const jsonLd = getBreadcrumbJsonLd(allItems);

  return (
    <nav aria-label="Trilha de navegação (Breadcrumbs)" className="my-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight size={12} className="text-gray-400 shrink-0" />}
              {isLast ? (
                <span className="font-semibold text-[#175057] line-clamp-1" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-[#206870] transition-colors flex items-center gap-1"
                >
                  {index === 0 && <Home size={12} />}
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
