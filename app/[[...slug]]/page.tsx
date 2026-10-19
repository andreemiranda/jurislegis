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
  getBanners,
  getRelatedPosts,
  getAdjacentPosts,
  searchContent,
  getAllPages,
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
import { constructMetadata } from '../../src/lib/seo/metadata';
import { env } from '../../src/config/env';

export const dynamicParams = true;
export const revalidate = 300;

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
    const postIds = searchRes.results.map((r) => r.id);

    // Se temos IDs de posts da busca, busca os posts completos para exibir com thumbnails
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
    // Se for página paginada da home (/page/2), exibe listagem de notícias
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

    // Home oficial com todos os blocos institucionais do tema Araguaia
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

  // 3. Rota de Vereador: /vereador/[slug]
  if (route.type === 'vereador') {
    const vereador = await getVereadorBySlug(route.slug);
    if (!vereador) {
      notFound();
    }
    return <VereadorDetail vereador={vereador} />;
  }

  // 4. Rota de Categoria: /categoria/[slug]
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

  // 5. Rota de Tag: /tag/[slug]
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

  // 6. Rota individual: tenta Post primeiro, depois Página
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

  const page = await getPageBySlug(route.slug);
  if (page) {
    return <PageDetail page={page} />;
  }

  // Se não encontrar nem post nem página
  notFound();
}
