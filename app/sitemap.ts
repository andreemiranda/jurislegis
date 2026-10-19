import type { MetadataRoute } from 'next';
import { getAllPages, getPosts, getCategories, getTags, getVereadores } from '../src/lib/wordpress/queries';
import { env } from '../src/config/env';
import { rewriteUrl } from '../src/lib/links/rewrite';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, postsData, categories, tags, vereadores] = await Promise.all([
    getAllPages().catch(() => []),
    getPosts({ perPage: 100 }).catch(() => ({ posts: [] })),
    getCategories().catch(() => []),
    getTags().catch(() => []),
    getVereadores().catch(() => []),
  ]);

  const siteUrl = env.SITE_URL;
  const entries: MetadataRoute.Sitemap = [];

  // 1. Home
  entries.push({
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: 'hourly',
    priority: 1.0,
  });

  // 2. Páginas institucionais
  for (const page of pages) {
    const rel = rewriteUrl(page.link).url;
    entries.push({
      url: `${siteUrl}${rel.startsWith('/') ? rel : `/${rel}`}`,
      lastModified: page.modified ? new Date(page.modified) : new Date(page.date),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // 3. Notícias / Posts
  for (const post of postsData.posts) {
    const rel = rewriteUrl(post.link).url;
    entries.push({
      url: `${siteUrl}${rel.startsWith('/') ? rel : `/${rel}`}`,
      lastModified: post.modified ? new Date(post.modified) : new Date(post.date),
      changeFrequency: 'daily',
      priority: 0.9,
    });
  }

  // 4. Categorias
  for (const cat of categories) {
    entries.push({
      url: `${siteUrl}/categoria/${cat.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    });
  }

  // 5. Tags
  for (const tag of tags) {
    entries.push({
      url: `${siteUrl}/tag/${tag.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    });
  }

  // 6. Vereadores
  for (const vdr of vereadores) {
    const rel = rewriteUrl(vdr.link).url;
    entries.push({
      url: `${siteUrl}${rel.startsWith('/') ? rel : `/${rel}`}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}
