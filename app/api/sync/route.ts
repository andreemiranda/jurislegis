import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { env } from '../../../src/config/env';
import { wpFetch } from '../../../src/lib/wordpress/client';

export const dynamic = 'force-dynamic';

/**
 * Endpoint de monitoramento e sincronização ao vivo com a API REST do WordPress.
 * Fornece status da conexão, contagem de publicações e permite sincronização forçada imediata.
 */
export async function GET(req: NextRequest) {
  const startTime = Date.now();
  const url = req.nextUrl;
  const forceSync = url.searchParams.get('action') === 'sync' || url.searchParams.get('force') === '1';

  try {
    // 1. Testa a conexão com a API do WordPress e busca o post mais recente
    const postsRes = await wpFetch<any[]>('/posts', {
      params: { per_page: 1, _embed: '1' },
      revalidate: forceSync ? 0 : undefined,
    });

    const latencyMs = Date.now() - startTime;
    const latestPost = postsRes.data?.[0];

    // 2. Se forceSync foi solicitado, invalida todos os caches
    if (forceSync) {
      const tags = [
        'posts',
        'pages',
        'vereadores',
        'videos',
        'banner',
        'servicos',
        'avisos',
        'galerias',
        'categories',
        'terms',
        'site-info',
      ];
      for (const t of tags) {
        revalidateTag(t);
      }
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      status: 'online',
      synchronized: true,
      apiEndpoint: env.WORDPRESS_API_URL,
      latencyMs: `${latencyMs}ms`,
      totalPostsInApi: postsRes.total,
      revalidateIntervalSeconds: env.REVALIDATE_SECONDS,
      forceSyncTriggered: forceSync,
      latestPost: latestPost
        ? {
            id: latestPost.id,
            title: latestPost.title?.rendered?.replace(/<[^>]+>/g, ''),
            date: latestPost.date,
            slug: latestPost.slug,
          }
        : null,
      serverTimestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        synchronized: false,
        apiEndpoint: env.WORDPRESS_API_URL,
        message: 'Falha ao consultar a API REST do WordPress',
        error: error.message,
        serverTimestamp: new Date().toISOString(),
      },
      { status: 502 }
    );
  }
}

export async function POST(req: NextRequest) {
  // Revalida tudo e retorna o status atualizado
  const tags = [
    'posts',
    'pages',
    'vereadores',
    'videos',
    'banner',
    'servicos',
    'avisos',
    'galerias',
    'categories',
    'terms',
    'site-info',
  ];
  for (const t of tags) {
    revalidateTag(t);
  }
  revalidatePath('/', 'layout');

  return GET(req);
}
