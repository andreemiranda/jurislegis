import type { NextConfig } from 'next';

const apiUrl = process.env.WORDPRESS_API_URL || 'https://www.paraisodotocantins.to.leg.br/wp-json/wp/v2';
let wpHostname = 'www.paraisodotocantins.to.leg.br';
let wpProtocol = 'https';
let wpOrigin = 'https://www.paraisodotocantins.to.leg.br';

try {
  const parsed = new URL(apiUrl);
  wpHostname = parsed.hostname;
  wpProtocol = parsed.protocol.replace(':', '');
  wpOrigin = `${parsed.protocol}//${parsed.host}`;
} catch {
  // use defaults
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: (wpProtocol as 'http' | 'https') || 'https',
        hostname: wpHostname,
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.paraisodotocantins.to.leg.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'paraisodotocantins.to.leg.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'camparaisodotocantins.nucleo.site',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/arquivos/:path*',
        destination: `${wpOrigin}/wp-content/uploads/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  webpack: (config, { dev }) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
