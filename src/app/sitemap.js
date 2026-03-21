export default async function sitemap() {
  const baseUrl = "https://inner-tide.studio";

  const homepage = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  };

  const memberPage = {
    url: `${baseUrl}/member`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  };

  let postUrls = [];
  const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  if (API_URL) {
    try {
      const response = await fetch(`${API_URL}/posts?_embed&per_page=100`, {
        next: { revalidate: 3600 },
      });
      if (response.ok) {
        const posts = await response.json();
        postUrls = (posts || []).map((post) => ({
          url: `${baseUrl}/blog/${post.id}`,
          lastModified: new Date(post.modified || post.date),
          changeFrequency: "weekly",
          priority: 0.7,
        }));
      }
    } catch {
      // If WordPress is unavailable, sitemap still returns the homepage
    }
  }

  return [homepage, memberPage, ...postUrls];
}
