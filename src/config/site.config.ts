import { env, wpOrigin } from './env';

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  wpOrigin: string;
  logo: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  contact: {
    phone: string;
    hours: string;
    address: string;
    email: string;
    cep: string;
    city: string;
    state: string;
  };
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  quickAccess: Array<{
    title: string;
    description?: string;
    link: string;
    icon: string;
    isExternal: boolean;
  }>;
}

export const siteConfig: SiteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Câmara Municipal de Paraíso do Tocantins',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Portal oficial da Câmara Municipal de Paraíso do Tocantins - TO. Legislação, notícias, transparência e serviços ao cidadão.',
  url: env.SITE_URL,
  wpOrigin,
  logo: {
    src: `${wpOrigin}/wp-content/uploads/2024/05/logo-paraios.png`,
    width: 261,
    height: 78,
    alt: 'Câmara Municipal de Paraíso do Tocantins',
  },
  contact: {
    phone: '(63) 3602-1688',
    hours: 'Segunda a Sexta-feira: 7h30 às 13h30',
    address: 'Avenida Bernardo Sayão N° 800',
    email: 'ouvidoria.camarapa@gmail.com',
    cep: '77600-000',
    city: 'Paraíso do Tocantins',
    state: 'TO',
  },
  social: {
    facebook: 'https://www.facebook.com/camaradeparaisoTO/',
    instagram: 'https://www.instagram.com/camaradeparaiso/',
    youtube: 'https://www.youtube.com/c/C%C3%A2maraMunPara%C3%ADsodoTO',
  },
  quickAccess: [
    {
      title: 'Portal da Transparência',
      description: 'Acompanhe as contas públicas, receitas e despesas.',
      link: 'https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/transparencia/inicio',
      icon: 'file-text',
      isExternal: true,
    },
    {
      title: 'e-SIC',
      description: 'Sistema Eletrônico do Serviço de Informação ao Cidadão.',
      link: 'https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/informacao/sic',
      icon: 'info',
      isExternal: true,
    },
    {
      title: 'Legislação Municipal',
      description: 'Consulte Leis, Decretos e Resoluções vigentes.',
      link: 'https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/legislacao/leis',
      icon: 'book',
      isExternal: true,
    },
    {
      title: 'Diário Oficial',
      description: 'Publicações oficiais e atos normativos.',
      link: 'https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/atos_adm/mp/id=1',
      icon: 'calendar',
      isExternal: true,
    },
    {
      title: 'Ouvidoria',
      description: 'Envie denúncias, elogios, sugestões e reclamações.',
      link: 'https://acessoainformacao.paraisodotocantins.to.leg.br/cidadao/ouvidoria/inicio',
      icon: 'message-circle',
      isExternal: true,
    },
    {
      title: 'Sessões Plenárias',
      description: 'Assista às transmissões e consulte atas e pautas.',
      link: '/transmissao-das-sessoes/',
      icon: 'video',
      isExternal: false,
    },
  ],
};
