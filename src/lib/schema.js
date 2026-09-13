import { absoluteUrl } from "./site";
import { stripHtml } from "./wordpress";

const BUSINESS_ID = absoluteUrl("/#business");

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ExerciseGym"],
    "@id": BUSINESS_ID,
    name: "Inner Tide Studios",
    url: absoluteUrl("/"),
    email: "emma@inner-tide.studio",
    description:
      "Boutique reformer Pilates studio offering small-group classes and private sessions in Finnieston, Glasgow.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Second Floor, 16 Fitzroy Place",
      addressLocality: "Glasgow",
      postalCode: "G3 7RW",
      addressCountry: "GB",
    },
    areaServed: ["Finnieston", "Glasgow", "West End Glasgow"],
    knowsAbout: [
      "Reformer Pilates",
      "Small-group Pilates",
      "Private reformer Pilates sessions",
    ],
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(post) {
  const isNews = post.categories.some((category) => category.slug === "news");
  return {
    "@context": "https://schema.org",
    "@type": isNews ? "NewsArticle" : "BlogPosting",
    headline: stripHtml(post.title),
    description: stripHtml(post.excerpt),
    datePublished: post.date,
    dateModified: post.modified,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: post.image?.url ? [post.image.url] : undefined,
    author: {
      "@type": "Organization",
      name: post.author || "Inner Tide Studios",
      "@id": BUSINESS_ID,
    },
    publisher: {
      "@type": "Organization",
      name: "Inner Tide Studios",
      "@id": BUSINESS_ID,
    },
  };
}

export function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: stripHtml(service.title),
    description: stripHtml(service.summary || service.excerpt),
    url: absoluteUrl(`/services/${service.slug}`),
    image: service.image?.url,
    areaServed: {
      "@type": "City",
      name: "Glasgow",
    },
    provider: {
      "@id": BUSINESS_ID,
    },
  };
}

