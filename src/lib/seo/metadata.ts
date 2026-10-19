import type { Metadata } from 'next';
import { env } from '../../config/env';
import { siteConfig } from '../../config/site.config';
import { rewriteMetadataUrl } from '../links/rewrite';

export interface SeoOptions {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export function constructMetadata({
  title,
  description = siteConfig.description,
  canonicalPath = '',
  image = siteConfig.logo.src,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
}: SeoOptions = {}): Metadata {
  const fullTitle = title
    ? `${title} - ${siteConfig.name}`
    : `${siteConfig.name} - Portal Oficial`;

  const canonicalUrl = `${env.SITE_URL}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
  const imageUrl = rewriteMetadataUrl(image, env.SITE_URL);

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: 'pt_BR',
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
