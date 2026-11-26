// Import path module from Node.js
const path = require("path");

/** @type {import('next').NextConfig} */
// Next.js configuration settings for the performance-optimized storefront
const nextConfig = {
  // Pin workspace root to this directory to avoid multiple lockfiles warnings
  outputFileTracingRoot: path.join(__dirname),
  // Enable React strict mode to detect potential side effects
  reactStrictMode: true,
  // Ensure typed routes are strictly checked
  typescript: {
    // Keep strict type checking during builds
    ignoreBuildErrors: false,
  },
  // Keep strict linting during builds
  eslint: {
    // Run ESLint during production build
    ignoreDuringBuilds: false,
  },
  // Advanced Next.js image optimization settings
  images: {
    // Modern next-gen image formats
    formats: ["image/avif", "image/webp"],
    // Supported responsive device breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

// Export the configuration object
module.exports = nextConfig;
