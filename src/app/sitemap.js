import { getSiteUrl } from "@/lib/site";
import { getAllPosts, getServices } from "@/lib/wordpress";

export default async function sitemap() {
  const baseUrl = getSiteUrl();

  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/news", priority: 0.8, changeFrequency: "weekly" },
    { path: "/member", priority: 0.6, changeFrequency: "monthly" },
  ].map(({ path, ...route }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    ...route,
  }));

  const [posts, services] = await Promise.all([getAllPosts(), getServices()]);

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modified || post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(service.modified || service.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes, ...serviceRoutes];
}
