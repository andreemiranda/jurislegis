import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../src/components/layout/Header';
import { Footer } from '../src/components/layout/Footer';
import { AccessibilitySidebar } from '../src/components/layout/AccessibilitySidebar';
import { getOrganizationJsonLd, getWebSiteJsonLd } from '../src/lib/seo/jsonld';
import { siteConfig } from '../src/config/site.config';
import { env } from '../src/config/env';

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: {
    default: `${siteConfig.name} - Portal Oficial`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'Câmara Municipal',
    'Paraíso do Tocantins',
    'Poder Legislativo',
    'Vereadores',
    'Leis Municipais',
    'Transparência',
    'Tocantins',
  ],
  authors: [{ name: siteConfig.name, url: env.SITE_URL }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    title: `${siteConfig.name} - Portal Oficial`,
    description: siteConfig.description,
    url: env.SITE_URL,
    siteName: siteConfig.name,
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: `${env.SITE_URL}/arquivos/2024/05/logo-paraios.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - Portal Oficial`,
    description: siteConfig.description,
    images: [`${env.SITE_URL}/arquivos/2024/05/logo-paraios.png`],
  },
  icons: {
    icon: '/arquivos/2024/05/logo-paraios.png',
    apple: '/arquivos/2024/05/logo-paraios.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = getOrganizationJsonLd();
  const webSiteJsonLd = getWebSiteJsonLd();

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#175057" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-white text-gray-800 antialiased min-h-screen flex flex-col">
        {/* Header institucional */}
        <Header />

        {/* Conteúdo principal */}
        <main id="conteudo-principal" className="flex-1" tabIndex={-1}>
          {children}
        </main>

        {/* Barra lateral fixa de Acessibilidade */}
        <AccessibilitySidebar />

        {/* Rodapé oficial */}
        <Footer />
      </body>
    </html>
  );
}
