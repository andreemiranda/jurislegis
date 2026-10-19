import { NextRequest, NextResponse } from 'next/server';
import { wpOrigin } from '../../../src/config/env';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  if (!path || path.length === 0) {
    return new NextResponse('Arquivo não especificado', { status: 400 });
  }

  const filePath = path.join('/');
  const targetUrl = `${wpOrigin}/wp-content/uploads/${filePath}`;

  try {
    const upstreamRes = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'PortalCamaraParaiso/1.0',
        Referer: wpOrigin,
      },
    });

    if (!upstreamRes.ok) {
      return new NextResponse('Arquivo não encontrado no repositório de mídia', {
        status: upstreamRes.status,
      });
    }

    const contentType = upstreamRes.headers.get('content-type') || 'application/octet-stream';
    const blob = await upstreamRes.arrayBuffer();

    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=2592000',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (err: any) {
    return new NextResponse('Erro ao buscar arquivo de mídia', { status: 502 });
  }
}
