import ArticleCard from "../components/ArticleCard";
import ContentEmptyState from "../components/ContentEmptyState";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { archiveMetadata } from "@/lib/seo";
import { getPosts } from "@/lib/wordpress";

export const metadata = archiveMetadata({
  title: "Studio News",
  description:
    "Classes, events, and announcements from Inner Tide Studios in Finnieston, Glasgow.",
  path: "/news",
});

export default async function NewsPage() {
  const posts = await getPosts({ limit: 100, newsOnly: true });

  return (
    <div className="page">
      <SiteHeader />
      <main className="main-content content-archive">
        <header className="content-hero">
          <p className="content-hero__eyebrow">What is happening</p>
          <h1>News</h1>
          <p>
            The latest classes, events, and announcements from Inner Tide
            Studios.
          </p>
        </header>
        {posts.length ? (
          <div className="content-grid">
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <ContentEmptyState type="news items" />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

