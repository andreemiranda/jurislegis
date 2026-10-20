import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { env } from '../../../src/config/env';

/**
 * Endpoint de sincronização e revalidação sob demanda (On-Demand ISR).
 * Aceita requisições GET e POST de webhooks do WordPress (ex: WP Webhooks, WP Headless,
 * ou chamadas manuais após publicação de novas matérias ou atualizações).
 */
async function handleRevalidation(req: NextRequest) {
  try {
    const url = new NextRequest(req.url).nextUrl;
    const secret =
      url.searchParams.get('secret') ||
      req.headers.get('x-revalidate-secret') ||
      req.headers.get('authorization')?.replace('Bearer ', '');

    if (!secret || secret !== env.REVALIDATE_SECRET) {
      return NextResponse.json(
        {
          success: false,
          message: 'Token de autorização inválido ou ausente. Forneça ?secret=...',
        },
        { status: 401 }
      );
    }

    let body: any = {};
    if (req.method === 'POST') {
      try {
        body = await req.json();
      } catch {
        // ignore parse error if body is empty or form-data
      }
    }

    const tag = url.searchParams.get('tag') || body.tag;
    const path = url.searchParams.get('path') || body.path;
    const slug =
      url.searchParams.get('slug') ||
      body.slug ||
      body.post_name ||
      body.post?.post_name;
    const postType =
      url.searchParams.get('type') ||
      body.post_type ||
      body.type ||
      body.post?.post_type;

    const revalidatedTags: string[] = [];
    const revalidatedPaths: string[] = [];

    // 1. Revalidação por Tag específica
    if (tag) {
      revalidateTag(tag);
      revalidatedTags.push(tag);
    }

    // 2. Revalidação por Slug e Tipo
    if (slug) {
      const cleanSlug = String(slug).replace(/^\/+|\/+$/g, '');
      revalidatePath(`/${cleanSlug}/`);
      revalidatePath(`/${cleanSlug}`);
      revalidatedPaths.push(`/${cleanSlug}`);

      if (postType === 'post' || !postType) {
        revalidateTag(`post:slug:${cleanSlug}`);
        revalidateTag('posts');
        revalidatedTags.push(`post:slug:${cleanSlug}`, 'posts');
      }

      if (postType === 'page') {
        revalidateTag(`page:slug:${cleanSlug}`);
        revalidateTag('pages');
        revalidatedTags.push(`page:slug:${cleanSlug}`, 'pages');
      }

      if (postType === 'videos') {
        revalidateTag(`video:${cleanSlug}`);
        revalidateTag('videos');
        revalidatePath('/videos');
        revalidatePath('/transmissao-das-sessoes');
        revalidatedTags.push(`video:${cleanSlug}`, 'videos');
      }

      if (postType === 'vereador') {
        revalidateTag(`vereador:${cleanSlug}`);
        revalidateTag('vereadores');
        revalidatedTags.push(`vereador:${cleanSlug}`, 'vereadores');
      }

      if (postType === 'servico') {
        revalidateTag(`servico:${cleanSlug}`);
        revalidateTag('servicos');
        revalidatePath('/servicos');
        revalidatedTags.push(`servico:${cleanSlug}`, 'servicos');
      }

      if (postType === 'aviso') {
        revalidateTag(`aviso:${cleanSlug}`);
        revalidateTag('avisos');
        revalidatePath('/avisos');
        revalidatedTags.push(`aviso:${cleanSlug}`, 'avisos');
      }

      if (postType === 'galeria') {
        revalidateTag(`galeria:${cleanSlug}`);
        revalidateTag('galerias');
        revalidatePath('/galeria-de-fotos');
        revalidatedTags.push(`galeria:${cleanSlug}`, 'galerias');
      }
    }

    // 3. Revalidação por Caminho direto
    if (path) {
      revalidatePath(path);
      revalidatedPaths.push(path);
    }

    // 4. Sempre que um post ou conteúdo é adicionado, revalida a Home e listagens
    revalidatePath('/', 'page');
    revalidatePath('/noticias', 'page');
    revalidatedPaths.push('/', '/noticias');

    // 5. Se foi pedido "all" ou nenhum item específico, revalida todas as tags institucionais
    const isAll = url.searchParams.get('all') === 'true' || body.all === true;
    if (isAll || (!tag && !slug && !path)) {
      const allTags = [
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
      for (const t of allTags) {
        revalidateTag(t);
        revalidatedTags.push(t);
      }
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      success: true,
      message: 'Sincronização processada com sucesso',
      timestamp: new Date().toISOString(),
      revalidatedTags: Array.from(new Set(revalidatedTags)),
      revalidatedPaths: Array.from(new Set(revalidatedPaths)),
    });
  } catch (error: any) {
    console.error('Erro na rota de revalidação:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao processar sincronização',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  return handleRevalidation(req);
}

export async function POST(req: NextRequest) {
  return handleRevalidation(req);
}
