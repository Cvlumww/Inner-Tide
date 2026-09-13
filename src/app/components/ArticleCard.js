import Image from "next/image";
import Link from "next/link";
import { sanitizeWordPressHtml, stripHtml } from "@/lib/wordpress";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function ArticleCard({ post }) {
  return (
    <article className="content-card">
      {post.image && (
        <Link
          href={`/blog/${post.slug}`}
          className="content-card__image"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={post.image.url}
            alt={post.image.alt}
            fill
            sizes="(max-width: 700px) 100vw, 33vw"
          />
        </Link>
      )}
      <div className="content-card__body">
        <p className="content-card__meta">
          <time dateTime={post.date}>
            {DATE_FORMATTER.format(new Date(post.date))}
          </time>
        </p>
        <h2 className="content-card__title">
          <Link href={`/blog/${post.slug}`}>{stripHtml(post.title)}</Link>
        </h2>
        {post.excerpt && (
          <div
            className="content-card__excerpt"
            dangerouslySetInnerHTML={{
              __html: sanitizeWordPressHtml(post.excerpt),
            }}
          />
        )}
        <Link href={`/blog/${post.slug}`} className="text-link">
          Read article
        </Link>
      </div>
    </article>
  );
}

