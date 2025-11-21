/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Disable ALL image optimization (no transformations)
  images: {
    unoptimized: true,                 // ⭐ IMPORTANT
    dangerouslyAllowSVG: true,
    remotePatterns: [],                // no remote restrictions needed
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  swcMinify: true,

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Mobile-first optimizations
  experimental: {
    optimizePackageImports: ['next/image', 'next/link', 'react', 'react-dom'],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // No caching for _next/image needed now (because it won't be used)
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
