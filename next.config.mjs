/** @type {import('next').NextConfig} */
function wordpressRemotePattern() {
  if (!process.env.WORDPRESS_API_URL) return [];

  try {
    const url = new URL(process.env.WORDPRESS_API_URL);
    return [
      {
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        port: url.port,
        pathname: "/**",
      },
    ];
  } catch {
    console.warn("WORDPRESS_API_URL is not a valid URL; remote images disabled.");
    return [];
  }
}

const nextConfig = {
  images: {
    // Modern formats: AVIF then WebP for much smaller files at same visual quality
    formats: ["image/avif", "image/webp"],
    // High‑res breakpoints so 2x/retina and large viewports get sharp images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Long cache so CDN and browsers cache optimized images (1 year)
    minimumCacheTTL: 31536000,
    remotePatterns: wordpressRemotePattern(),
  },
};

export default nextConfig;
