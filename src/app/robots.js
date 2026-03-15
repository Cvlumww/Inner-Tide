export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://inner-tide.studio/sitemap.xml",
  };
}
