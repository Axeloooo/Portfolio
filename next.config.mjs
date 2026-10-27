/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // The chat prompt reads the blog posts at runtime.
    outputFileTracingIncludes: {
      "/api/chat": ["./content/**/*.mdx"],
    },
  },
};

export default nextConfig;
