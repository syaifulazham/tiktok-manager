/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Configure for Cloudflare Pages
  experimental: {
    // This is experimental but necessary for Cloudflare Pages
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  // Ensure all routes use the Edge Runtime
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  }
};

module.exports = nextConfig;
