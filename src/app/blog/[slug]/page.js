import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import RichContent from "../../components/RichContent";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { contentMetadata } from "@/lib/seo";
import { getAllPosts, getPostBySlug, stripHtml } from "@/lib/wordpress";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return contentMetadata(post, `/blog/${slug}`, "article");
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const isNews = post.categories.some((category) => category.slug === "news");
  const parent = isNews
    ? { name: "News", path: "/news" }
    : { name: "Blog", path: "/blog" };

  return (
    <div className="page">
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          parent,
          { name: stripHtml(post.title), path: `/blog/${post.slug}` },
        ])}
      />
      <SiteHeader />
      <main className="main-content content-detail">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: isNews ? "News" : "Blog", href: isNews ? "/news" : "/blog" },
            { label: stripHtml(post.title) },
          ]}
        />
        <article>
          <header className="content-detail__header">
            <p className="content-hero__eyebrow">{isNews ? "News" : "Blog"}</p>
            <h1>{stripHtml(post.title)}</h1>
            <p className="content-detail__meta">
              <time dateTime={post.date}>
                {DATE_FORMATTER.format(new Date(post.date))}
              </time>
              <span>By {post.author}</span>
            </p>
          </header>
          {post.image && (
            <div className="content-detail__image">
              <Image
                src={post.image.url}
                alt={post.image.alt}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                priority
              />
            </div>
          )}
          <RichContent html={post.content} />
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

