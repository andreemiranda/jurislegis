import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { env } from '../../../src/config/env';

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get('secret') || req.headers.get('x-revalidate-secret');

    if (!secret || secret !== env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Token de autorização inválido' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const tag = body.tag || req.nextUrl.searchParams.get('tag');
    const path = body.path || req.nextUrl.searchParams.get('path');

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ revalidated: true, tag, now: Date.now() });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path, now: Date.now() });
    }

    // Se nenhum parâmetro específico foi informado, revalida tudo
    revalidatePath('/', 'layout');
    revalidateTag('posts');
    revalidateTag('pages');

    return NextResponse.json({ revalidated: true, all: true, now: Date.now() });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Erro ao processar revalidação', error: error.message },
      { status: 500 }
    );
  }
}
