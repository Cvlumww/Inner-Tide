/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Modern formats: AVIF then WebP for much smaller files at same visual quality
    formats: ["image/avif", "image/webp"],
    // High‑res breakpoints so 2x/retina and large viewports get sharp images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Long cache so CDN and browsers cache optimized images (1 year)
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
