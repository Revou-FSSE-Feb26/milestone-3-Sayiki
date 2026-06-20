import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/img/**',
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
  // Netlify compatibility
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Ensure API routes work properly
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
};

export default nextConfig;
