/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The chat prompt reads the blog posts at runtime.
  outputFileTracingIncludes: {
    "/api/chat": ["./content/**/*.mdx"],
  },
  experimental: {
    // Inline the (small) stylesheet into the HTML so the first paint does not
    // wait on a separate CSS request; this is the main mobile LCP win.
    inlineCss: true,
  },
};

export default nextConfig;
