import type { MetadataRoute } from 'next';
import { env } from '../src/config/env';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = env.SITE_URL;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/wp-admin/',
          '/wp-includes/',
          '/*.html$',
          '/api/',
        ],
        crawlDelay: 5,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
