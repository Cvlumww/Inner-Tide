import ArticleCard from "../components/ArticleCard";
import ContentEmptyState from "../components/ContentEmptyState";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { archiveMetadata } from "@/lib/seo";
import { getPosts } from "@/lib/wordpress";

export const metadata = archiveMetadata({
  title: "Reformer Pilates Blog",
  description:
    "Pilates guidance, studio stories, and wellbeing ideas from Inner Tide Studios in Finnieston, Glasgow.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPosts({ limit: 100 });

  return (
    <div className="page">
      <SiteHeader />
      <main className="main-content content-archive">
        <header className="content-hero">
          <p className="content-hero__eyebrow">From the studio</p>
          <h1>Blog</h1>
          <p>
            Practical Pilates guidance, studio stories, and thoughtful ways to
            support strength, balance, and wellbeing.
          </p>
        </header>
        {posts.length ? (
          <div className="content-grid">
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <ContentEmptyState type="articles" />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

