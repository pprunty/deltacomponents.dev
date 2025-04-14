/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
  },
  outputFileTracingIncludes: {
    registry: ['./registry/**/*', './_alt/**/*'],
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

module.exports = nextConfig;
