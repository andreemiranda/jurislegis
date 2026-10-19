import { NextResponse } from 'next/server';
import { Feed } from 'feed';
import { getPosts, getSiteInfo } from '../../src/lib/wordpress/queries';
import { env } from '../../src/config/env';
import { siteConfig } from '../../src/config/site.config';
import { rewriteUrl } from '../../src/lib/links/rewrite';

export const revalidate = 300;

export async function GET() {
  const [siteInfo, postsData] = await Promise.all([
    getSiteInfo(),
    getPosts({ perPage: 25 }),
  ]);

  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: env.SITE_URL,
    link: env.SITE_URL,
    language: 'pt-BR',
    image: `${env.SITE_URL}/arquivos/2024/05/logo-paraios.png`,
    favicon: `${env.SITE_URL}/favicon.ico`,
    copyright: `Todos os direitos reservados à ${siteConfig.name}`,
    updated: new Date(),
    generator: siteConfig.name,
    feedLinks: {
      rss2: `${env.SITE_URL}/feed`,
    },
    author: {
      name: siteConfig.name,
      email: siteConfig.contact.email,
      link: env.SITE_URL,
    },
  });

  for (const post of postsData.posts) {
    const postUrl = `${env.SITE_URL}${rewriteUrl(post.link).url}`;
    const mediaUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const authorName = post._embedded?.author?.[0]?.name || siteConfig.name;

    feed.addItem({
      title: post.title.rendered.replace(/<[^>]+>/g, ''),
      id: postUrl,
      link: postUrl,
      description: post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '',
      content: post.content.rendered,
      author: [
        {
          name: authorName,
          link: env.SITE_URL,
        },
      ],
      date: new Date(post.date),
      image: mediaUrl ? `${env.SITE_URL}${rewriteUrl(mediaUrl).url}` : undefined,
    });
  }

  return new NextResponse(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=300, stale-while-revalidate',
    },
  });
}
