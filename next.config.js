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

  // Enhanced caching configuration
  async headers() {
    return [
      {
        // Cache static assets (images, fonts, etc.) for 1 year with immutable
        // Browser will only re-fetch if URL changes (e.g., when you update an image)
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        // Cache Next.js static files
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts
        source: '/fonts/:path*',
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
