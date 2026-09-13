import sanitizeHtml from "sanitize-html";

const DEFAULT_REVALIDATE_SECONDS = 3600;
const REQUEST_TIMEOUT_MS = 8000;
const API_URL = process.env.WORDPRESS_API_URL?.replace(/\/+$/, "");

function buildUrl(resource, params = {}) {
  if (!API_URL) return null;

  const url = new URL(`${API_URL}/${resource.replace(/^\/+/, "")}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });
  return url;
}

async function request(resource, params = {}, options = {}) {
  const url = buildUrl(resource, params);
  if (!url) return null;

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: {
        revalidate: options.revalidate ?? DEFAULT_REVALIDATE_SECONDS,
        tags: options.tags ?? ["wordpress"],
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`WordPress returned ${response.status} for ${url.pathname}`);
    }

    return {
      data: await response.json(),
      totalPages: Number(response.headers.get("X-WP-TotalPages") || 1),
    };
  } catch (error) {
    console.error("WordPress request failed:", error.message);
    return null;
  }
}

async function getCollection(resource, params, tags, allPages = false) {
  const first = await request(
    resource,
    { ...params, page: 1 },
    { tags: ["wordpress", ...tags] },
  );
  if (!first || !Array.isArray(first.data)) return [];
  if (!allPages || first.totalPages <= 1) return first.data;

  const remainingPages = await Promise.all(
    Array.from({ length: first.totalPages - 1 }, (_, index) =>
      request(
        resource,
        { ...params, page: index + 2 },
        { tags: ["wordpress", ...tags] },
      ),
    ),
  );

  return [
    ...first.data,
    ...remainingPages.flatMap((page) =>
      page && Array.isArray(page.data) ? page.data : [],
    ),
  ];
}

function featuredImage(item) {
  const media = item?._embedded?.["wp:featuredmedia"]?.[0];
  if (!media?.source_url) return null;

  return {
    url: media.source_url,
    alt: media.alt_text || stripHtml(item.title?.rendered || ""),
    width: media.media_details?.width || null,
    height: media.media_details?.height || null,
  };
}

function normalizeYoast(yoast = {}) {
  return {
    title: yoast.title || null,
    description: yoast.description || null,
    canonical: yoast.canonical || null,
    robots: yoast.robots || null,
    openGraphTitle: yoast.og_title || null,
    openGraphDescription: yoast.og_description || null,
    openGraphImage: yoast.og_image?.[0]?.url || null,
  };
}

function normalizeBase(item) {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title?.rendered || "",
    excerpt: item.excerpt?.rendered || "",
    content: item.content?.rendered || "",
    date: item.date,
    modified: item.modified,
    image: featuredImage(item),
    seo: normalizeYoast(item.yoast_head_json),
  };
}

function normalizePost(item) {
  return {
    ...normalizeBase(item),
    categories:
      item?._embedded?.["wp:term"]?.[0]?.map(({ id, name, slug }) => ({
        id,
        name,
        slug,
      })) || [],
    author: item?._embedded?.author?.[0]?.name || "Inner Tide Studios",
  };
}

function normalizeService(item) {
  const acf = item.acf || {};
  return {
    ...normalizeBase(item),
    summary: acf.summary || item.excerpt?.rendered || "",
    benefits: Array.isArray(acf.benefits)
      ? acf.benefits.map((benefit) =>
          typeof benefit === "string" ? benefit : benefit.text,
        ).filter(Boolean)
      : [],
    suitability: acf.suitability || "",
    duration: acf.duration || "",
    price: acf.price || "",
    bookingLabel: acf.booking_label || "Book now",
    bookingUrl: acf.booking_url || "/#booking",
    gallery: Array.isArray(acf.gallery)
      ? acf.gallery.map((image) => ({
          id: image.ID || image.id,
          url: image.url,
          alt: image.alt || "",
          width: image.width || null,
          height: image.height || null,
        }))
      : [],
    featured: Boolean(acf.featured),
    order: Number(item.menu_order || 0),
  };
}

export function stripHtml(value = "") {
  return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }).trim();
}

export function sanitizeWordPressHtml(value = "") {
  return sanitizeHtml(value, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "figure",
      "figcaption",
      "picture",
      "source",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["class", "id"],
      a: ["href", "name", "target", "rel", "class"],
      img: ["src", "srcset", "sizes", "alt", "width", "height", "loading"],
      source: ["src", "srcset", "sizes", "type", "media"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          ...(attribs.target === "_blank"
            ? { rel: "noopener noreferrer" }
            : {}),
        },
      }),
    },
  });
}

export async function getPosts({ limit = 12, newsOnly = false } = {}) {
  let category;
  if (newsOnly) {
    const categories = await getCollection(
      "categories",
      { slug: "news", per_page: 1 },
      ["categories"],
    );
    category = categories[0]?.id;
    if (!category) return [];
  }

  const posts = await getCollection(
    "posts",
    {
      _embed: 1,
      per_page: Math.min(limit, 100),
      categories: category,
      orderby: "date",
      order: "desc",
    },
    ["posts"],
  );
  return posts.map(normalizePost);
}

export async function getAllPosts() {
  const posts = await getCollection(
    "posts",
    { _embed: 1, per_page: 100, orderby: "date", order: "desc" },
    ["posts"],
    true,
  );
  return posts.map(normalizePost);
}

export async function getPostBySlug(slug) {
  const posts = await getCollection(
    "posts",
    { slug, _embed: 1, per_page: 1 },
    ["posts", `post:${slug}`],
  );
  return posts[0] ? normalizePost(posts[0]) : null;
}

export async function getServices({ featuredOnly = false } = {}) {
  const services = await getCollection(
    "services",
    { _embed: 1, per_page: 100, orderby: "menu_order", order: "asc" },
    ["services"],
  );
  const normalized = services.map(normalizeService);
  return featuredOnly
    ? normalized.filter((service) => service.featured)
    : normalized;
}

export async function getServiceBySlug(slug) {
  const services = await getCollection(
    "services",
    { slug, _embed: 1, per_page: 1 },
    ["services", `service:${slug}`],
  );
  return services[0] ? normalizeService(services[0]) : null;
}

export function isWordPressConfigured() {
  return Boolean(API_URL);
}

