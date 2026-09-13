import { absoluteUrl, SITE_NAME } from "./site";
import { stripHtml } from "./wordpress";

function descriptionFor(content) {
  const value = stripHtml(
    content.seo?.description || content.excerpt || content.summary || content.content,
  );
  return value.length > 160 ? `${value.slice(0, 157).trim()}…` : value;
}

export function contentMetadata(content, path, type = "article") {
  const title = stripHtml(content.seo?.title || content.title);
  const description = descriptionFor(content);
  const image = content.seo?.openGraphImage || content.image?.url;
  const url = absoluteUrl(path);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: {
      index: content.seo?.robots?.index !== "noindex",
      follow: content.seo?.robots?.follow !== "nofollow",
    },
    openGraph: {
      title: stripHtml(content.seo?.openGraphTitle || title),
      description: content.seo?.openGraphDescription || description,
      url,
      siteName: SITE_NAME,
      locale: "en_GB",
      type,
      images: image ? [{ url: image, alt: content.image?.alt || title }] : [],
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export function archiveMetadata({ title, description, path }) {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

