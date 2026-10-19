import { env } from '../../config/env';
import { siteConfig } from '../../config/site.config';

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: siteConfig.name,
    url: env.SITE_URL,
    logo: `${env.SITE_URL}/arquivos/2024/05/logo-paraios.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address,
      addressLocality: siteConfig.contact.city,
      addressRegion: siteConfig.contact.state,
      postalCode: siteConfig.contact.cep,
      addressCountry: 'BR',
    },
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.youtube,
    ].filter(Boolean),
  };
}

export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: env.SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${env.SITE_URL}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getNewsArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description,
    url,
    image: image ? [image] : undefined,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName || siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${env.SITE_URL}/arquivos/2024/05/logo-paraios.png`,
      },
    },
  };
}

export function getBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${env.SITE_URL}${item.url}`,
    })),
  };
}
