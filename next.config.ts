import remarkGfm from 'remark-gfm';

// next.config.js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/, // Process .mdx files
  options: {
    remarkPlugins: [remarkGfm],
  },
  // providerImportSource: 'mdx-components', // only if overriding default provider
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { mdxRs: true }, // optional: Rust-based compiler
  outputFileTracingIncludes: {
    registry: ['./delta/**/*', './_alt/**/*'],
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

module.exports = withMDX(nextConfig);
