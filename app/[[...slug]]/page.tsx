import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { resolveRoute } from '../../src/lib/wordpress/route-map';
import {
  getPosts,
  getPostBySlug,
  getPageBySlug,
  getVereadorBySlug,
  getCategoryBySlug,
  getVereadores,
  getVideos,
  getVideoBySlug,
  getBanners,
  getServicos,
  getServicoBySlug,
  getAvisos,
  getAvisoBySlug,
  getGalerias,
  getGaleriaBySlug,
  getEstruturaBySlug,
  getPostsByDate,
  getRelatedPosts,
  getAdjacentPosts,
  searchContent,
} from '../../src/lib/wordpress/queries';
import { BannerSlider } from '../../src/components/home/BannerSlider';
import { QuickAccess } from '../../src/components/home/QuickAccess';
import { LatestPosts } from '../../src/components/home/LatestPosts';
import { VereadoresSection } from '../../src/components/home/VereadoresSection';
import { VideoSessionSection } from '../../src/components/home/VideoSessionSection';
import { AboutCitySection } from '../../src/components/home/AboutCitySection';
import { PostDetail } from '../../src/components/content/PostDetail';
import { PageDetail } from '../../src/components/content/PageDetail';
import { VereadorDetail } from '../../src/components/content/VereadorDetail';
import { PostList } from '../../src/components/content/PostList';
import { ServicesList } from '../../src/components/content/ServicesList';
import { ServiceDetail } from '../../src/components/content/ServiceDetail';
import { AvisosArchive } from '../../src/components/content/AvisosArchive';
import { AvisoDetail } from '../../src/components/content/AvisoDetail';
import { VideosArchive } from '../../src/components/content/VideosArchive';
import { VideoDetail } from '../../src/components/content/VideoDetail';
import { GaleriasArchive } from '../../src/components/content/GaleriasArchive';
import { GaleriaDetail } from '../../src/components/content/GaleriaDetail';
import { FaleConoscoPage } from '../../src/components/content/FaleConoscoPage';
import { MapaDoSitePage } from '../../src/components/content/MapaDoSitePage';
import { AcessibilidadePage } from '../../src/components/content/AcessibilidadePage';
import { constructMetadata } from '../../src/lib/seo/metadata';

export const dynamicParams = true;
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ s?: string; page?: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { s: searchQuery } = await searchParams;

  if (searchQuery) {
    return constructMetadata({
      title: `Resultados da busca por "${searchQuery}"`,
      canonicalPath: `/?s=${encodeURIComponent(searchQuery)}`,
    });
  }

  const route = resolveRoute(slug);

  if (route.type === 'home') {
    return constructMetadata({
      title: 'Início',
      canonicalPath: '/',
    });
  }

  if (route.type === 'noticias-archive') {
    return constructMetadata({
      title: 'Notícias da Câmara',
      description: 'Acompanhe as notícias e coberturas legislativas da Câmara Municipal de Paraíso do Tocantins.',
      canonicalPath: '/noticias/',
    });
  }

  if (route.type === 'services-archive') {
    return constructMetadata({
      title: 'Serviços ao Cidadão',
      description: 'Carta de serviços oferecidos pelo Poder Legislativo aos cidadãos.',
      canonicalPath: '/servicos/',
    });
  }

  if (route.type === 'servico') {
    const servico = await getServicoBySlug(route.slug);
    const title = servico?.title?.rendered?.replace(/<[^>]+>/g, '') || 'Serviço';
    return constructMetadata({
      title,
      description: servico?.excerpt?.rendered?.replace(/<[^>]+>/g, '')?.trim(),
      canonicalPath: `/servico/${route.slug}/`,
    });
  }

  if (route.type === 'avisos-archive') {
    return constructMetadata({
      title: 'Avisos Oficiais',
      description: 'Editais, convocações e comunicados oficiais da Câmara Municipal.',
      canonicalPath: '/avisos/',
    });
  }

  if (route.type === 'aviso') {
    const aviso = await getAvisoBySlug(route.slug);
    const title = aviso?.title?.rendered?.replace(/<[^>]+>/g, '') || 'Aviso Oficial';
    return constructMetadata({
      title,
      canonicalPath: `/aviso/${route.slug}/`,
    });
  }

  if (route.type === 'videos-archive' || route.type === 'transmissao-sessoes') {
    return constructMetadata({
      title: 'Transmissão das Sessões - TV Câmara',
      description: 'Assista ao vivo ou veja as gravações das sessões plenárias da Câmara.',
      canonicalPath: route.fullPath,
    });
  }

  if (route.type === 'video') {
    const video = await getVideoBySlug(route.slug);
    const title = video?.title?.rendered?.replace(/<[^>]+>/g, '') || 'Sessão Plenária';
    return constructMetadata({
      title,
      canonicalPath: `/video/${route.slug}/`,
    });
  }

  if (route.type === 'galerias-archive') {
    return constructMetadata({
      title: 'Galeria de Fotos',
      description: 'Cobertura fotográfica dos eventos e sessões solenes da Câmara.',
      canonicalPath: '/galeria-de-fotos/',
    });
  }

  if (route.type === 'galeria') {
    const galeria = await getGaleriaBySlug(route.slug);
    const title = galeria?.title?.rendered?.replace(/<[^>]+>/g, '') || 'Álbum Fotográfico';
    return constructMetadata({
      title,
      canonicalPath: `/galeria/${route.slug}/`,
    });
  }

  if (route.type === 'fale-conosco') {
    return constructMetadata({
      title: 'Fale Conosco',
      description: 'Canais de atendimento, ouvidoria e contato presencial com a Câmara Municipal.',
      canonicalPath: '/fale-conosco/',
    });
  }

  if (route.type === 'mapa-do-site') {
    return constructMetadata({
      title: 'Mapa do Site',
      description: 'Índice de navegação estruturada de todo o portal legislativo.',
      canonicalPath: '/mapa-do-site/',
    });
  }

  if (route.type === 'acessibilidade') {
    return constructMetadata({
      title: 'Declaração de Acessibilidade',
      description: 'Diretrizes, recursos de alto contraste e atalhos de navegação e-MAG e WCAG 2.1.',
      canonicalPath: '/acessibilidade/',
    });
  }

  if (route.type === 'vereador') {
    const vereador = await getVereadorBySlug(route.slug);
    if (vereador) {
      const name = vereador.title.rendered.replace(/<[^>]+>/g, '');
      return constructMetadata({
        title: `${name} - Vereador`,
        canonicalPath: `/vereador/${route.slug}/`,
      });
    }
  }

  if (route.type === 'category') {
    const category = await getCategoryBySlug(route.slug);
    return constructMetadata({
      title: category ? category.name : 'Notícias',
      description: category?.description || 'Arquivo de publicações e notícias da Câmara',
      canonicalPath: `/categoria/${route.slug}/`,
    });
  }

  // Tenta post primeiro
  const post = await getPostBySlug(route.slug);
  if (post) {
    const cleanTitle = post.title.rendered.replace(/<[^>]+>/g, '');
    const cleanDesc = post.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim();
    const mediaUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    return constructMetadata({
      title: cleanTitle,
      description: cleanDesc,
      canonicalPath: `/${route.slug}/`,
      image: mediaUrl,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
    });
  }

  // Tenta página
  const page = await getPageBySlug(route.slug);
  if (page) {
    const cleanTitle = page.title.rendered.replace(/<[^>]+>/g, '');
    const cleanDesc = page.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim();
    const mediaUrl = page._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    return constructMetadata({
      title: cleanTitle,
      description: cleanDesc,
      canonicalPath: `/${route.slug}/`,
      image: mediaUrl,
    });
  }

  return constructMetadata({
    title: 'Portal Oficial',
    canonicalPath: route.fullPath,
  });
}

export default async function CatchAllPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { s: searchQuery, page: queryPage } = await searchParams;

  // 1. Busca por termo via query parameter `/?s=termo`
  if (searchQuery) {
    const pageNum = parseInt(queryPage || '1', 10);
    const searchRes = await searchContent(searchQuery, pageNum, 12);
    let postsData = await getPosts({ search: searchQuery, page: pageNum, perPage: 12 });

    return (
      <PostList
        title={`Resultados da busca: "${searchQuery}"`}
        description={`Foram encontrados ${searchRes.total} resultados.`}
        posts={postsData.posts}
        currentPage={pageNum}
        totalPages={postsData.totalPages || 1}
        basePath={`/?s=${encodeURIComponent(searchQuery)}`}
      />
    );
  }

  const route = resolveRoute(slug);

  // 2. Home Page
  if (route.type === 'home') {
    if (route.pageNumber && route.pageNumber > 1) {
      const postsData = await getPosts({ page: route.pageNumber, perPage: 12 });
      return (
        <PostList
          title="Notícias da Câmara"
          description="Acompanhe todas as matérias e publicações institucionais"
          posts={postsData.posts}
          currentPage={route.pageNumber}
          totalPages={postsData.totalPages}
          basePath=""
        />
      );
    }

    const [postsRes, vereadores, videos, banners] = await Promise.all([
      getPosts({ perPage: 6 }).catch(() => ({ posts: [], total: 0, totalPages: 0 })),
      getVereadores().catch(() => []),
      getVideos(6).catch(() => []),
      getBanners().catch(() => []),
    ]);

    const bannerSlides = banners.map((b) => ({
      id: b.id,
      title: b.title?.rendered?.replace(/<[^>]+>/g, '') || 'Banner Principal',
      imageUrl: b._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/arquivos/2024/05/FullBanner-paraisodotocantins.png',
      link: b.link,
    }));

    return (
      <div className="flex flex-col gap-2">
        <BannerSlider slides={bannerSlides.length > 0 ? bannerSlides : undefined} />
        <QuickAccess />
        <LatestPosts posts={postsRes.posts} />
        <VereadoresSection vereadores={vereadores} />
        <VideoSessionSection videos={videos} />
        <AboutCitySection />
      </div>
    );
  }

  // 3. Notícias Arquivo: /noticias ou /noticias/page/2
  if (route.type === 'noticias-archive') {
    const pageNum = route.pageNumber || 1;
    const postsData = await getPosts({ page: pageNum, perPage: 12 });
    return (
      <PostList
        title="Notícias da Câmara"
        description="Acompanhe todas as matérias, sessões e comunicados oficiais do Poder Legislativo"
        posts={postsData.posts}
        currentPage={pageNum}
        totalPages={postsData.totalPages}
        basePath="/noticias"
      />
    );
  }

  // 4. Serviços Arquivo e Individual: /servicos e /servico/[slug]
  if (route.type === 'services-archive') {
    const services = await getServicos().catch(() => []);
    return <ServicesList services={services} />;
  }

  if (route.type === 'servico') {
    const servico = await getServicoBySlug(route.slug);
    if (!servico) notFound();
    return <ServiceDetail service={servico} />;
  }

  // 5. Avisos Arquivo e Individual: /avisos e /aviso/[slug]
  if (route.type === 'avisos-archive') {
    const avisos = await getAvisos().catch(() => []);
    return <AvisosArchive avisos={avisos} />;
  }

  if (route.type === 'aviso') {
    const aviso = await getAvisoBySlug(route.slug);
    if (!aviso) notFound();
    return <AvisoDetail aviso={aviso} />;
  }

  // 6. Vídeos e Transmissão de Sessões: /videos, /transmissao-das-sessoes, /sessoes, /video/[slug]
  if (route.type === 'videos-archive') {
    const videos = await getVideos(30).catch(() => []);
    return <VideosArchive videos={videos} title="Galeria de Vídeos da Câmara" />;
  }

  if (route.type === 'transmissao-sessoes') {
    const videos = await getVideos(30).catch(() => []);
    return <VideosArchive videos={videos} title="Transmissão das Sessões Plenárias" isLivePage={true} />;
  }

  if (route.type === 'video') {
    const video = await getVideoBySlug(route.slug);
    if (!video) notFound();
    return <VideoDetail video={video} />;
  }

  // 7. Galerias de Fotos: /galeria-de-fotos, /galeria-de-fotos-2, /galeria/[slug]
  if (route.type === 'galerias-archive') {
    const galerias = await getGalerias().catch(() => []);
    return <GaleriasArchive galerias={galerias} />;
  }

  if (route.type === 'galeria') {
    const galeria = await getGaleriaBySlug(route.slug);
    if (!galeria) notFound();
    return <GaleriaDetail galeria={galeria} />;
  }

  // 8. Páginas Especiais: Fale Conosco, Mapa do Site, Acessibilidade
  if (route.type === 'fale-conosco') {
    return <FaleConoscoPage />;
  }

  if (route.type === 'mapa-do-site') {
    return <MapaDoSitePage />;
  }

  if (route.type === 'acessibilidade') {
    return <AcessibilidadePage />;
  }

  // 9. Rota de Vereador: /vereador/[slug]
  if (route.type === 'vereador') {
    const vereador = await getVereadorBySlug(route.slug);
    if (!vereador) {
      notFound();
    }
    return <VereadorDetail vereador={vereador} />;
  }

  // 10. Rota de Categoria: /categoria/[slug]
  if (route.type === 'category') {
    const category = await getCategoryBySlug(route.slug);
    const pageNum = route.pageNumber || 1;
    const catId = category?.id ? [category.id] : undefined;
    const postsData = await getPosts({
      categories: catId,
      page: pageNum,
      perPage: 12,
    });

    return (
      <PostList
        title={category ? category.name : 'Notícias'}
        description={category?.description}
        posts={postsData.posts}
        currentPage={pageNum}
        totalPages={postsData.totalPages}
        basePath={`/categoria/${route.slug}`}
      />
    );
  }

  // 11. Rota de Tag: /tag/[slug]
  if (route.type === 'tag') {
    const pageNum = route.pageNumber || 1;
    const postsData = await getPosts({ page: pageNum, perPage: 12 });
    return (
      <PostList
        title={`Assunto: ${route.slug.replace(/-/g, ' ')}`}
        posts={postsData.posts}
        currentPage={pageNum}
        totalPages={postsData.totalPages}
        basePath={`/tag/${route.slug}`}
      />
    );
  }

  // 12. Arquivo por Data: /[year]/[month]
  if (route.type === 'date-archive' && route.year && route.month) {
    const pageNum = route.pageNumber || 1;
    const postsData = await getPostsByDate(route.year, route.month, pageNum, 12);
    return (
      <PostList
        title={`Arquivo: ${route.month}/${route.year}`}
        description={`Notícias e atos legislativos publicados no período de ${route.month}/${route.year}`}
        posts={postsData.posts}
        currentPage={pageNum}
        totalPages={postsData.totalPages}
        basePath={`/${route.year}/${route.month}`}
      />
    );
  }

  // 13. Estrutura Organizacional CPT: /estrutura/[slug]
  if (route.type === 'estrutura') {
    const estrutura = await getEstruturaBySlug(route.slug);
    if (estrutura) {
      return <PageDetail page={estrutura} />;
    }
  }

  // 14. Post Individual
  const post = await getPostBySlug(route.slug);
  if (post) {
    const [related, adjacent] = await Promise.all([
      getRelatedPosts(post.id, post.categories, 3).catch(() => []),
      getAdjacentPosts(post.date).catch(() => ({ previous: null, next: null })),
    ]);

    return (
      <PostDetail
        post={post}
        relatedPosts={related}
        previousPost={adjacent.previous}
        nextPost={adjacent.next}
      />
    );
  }

  // 15. Página Institucional
  const page = await getPageBySlug(route.slug);
  if (page) {
    return <PageDetail page={page} />;
  }

  // Se não encontrar nem post nem página
  notFound();
}
