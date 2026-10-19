import React from 'react';
import Image from 'next/image';
import { WpPage } from '../../lib/wordpress/schemas';
import { ContentRenderer } from './ContentRenderer';
import { Breadcrumbs } from './Breadcrumbs';
import { rewriteUrl } from '../../lib/links/rewrite';

interface PageDetailProps {
  page: WpPage;
}

export function PageDetail({ page }: PageDetailProps) {
  const featuredMediaUrl = page._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const imageUrl = featuredMediaUrl ? rewriteUrl(featuredMediaUrl).url : undefined;
  const title = page.title.rendered.replace(/<[^>]+>/g, '');

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { name: title, url: rewriteUrl(page.link).url },
        ]}
      />

      <header className="mb-8 pb-4 border-b-2 border-gray-100">
        <h1
          className="text-3xl sm:text-4xl font-extrabold text-[#175057] leading-tight"
          dangerouslySetInnerHTML={{ __html: page.title.rendered }}
        />
      </header>

      {imageUrl && (
        <div className="relative aspect-16/9 w-full rounded-lg overflow-hidden mb-8 shadow-md bg-gray-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            className="object-cover"
            referrerPolicy="no-referrer"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <ContentRenderer content={page.content.rendered} />
      </div>
    </article>
  );
}
