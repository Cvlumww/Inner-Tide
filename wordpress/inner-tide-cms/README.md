# Inner Tide WordPress setup

This plugin defines the CMS contract used by the Next.js site. WordPress itself
is hosted separately; use a private host such as `cms.inner-tide.studio`.

## Install

1. Install a current supported WordPress release over HTTPS.
2. Set permalinks to **Post name**.
3. Install and activate **Advanced Custom Fields Pro** and **Yoast SEO**.
4. Copy `inner-tide-cms` into `wp-content/plugins/` and activate **Inner Tide
   CMS**.
5. In **ACF → Field Groups**, sync **Service details** if ACF offers the sync
   action.
6. Create a post category with the slug `news`.
7. In **Settings → Reading**, enable “Discourage search engines from indexing
   this site”. The public Next.js site is the canonical, indexable site.
8. Confirm the REST responses described below before connecting production.

Do not install a second plugin that registers a `service` post type or the
`/wp-json/wp/v2/services` route.

## Revalidation

Generate a long random secret and configure the same value in WordPress and the
Next.js host:

```php
// wp-config.php
define('INNER_TIDE_REVALIDATE_URL', 'https://inner-tide.studio/api/revalidate');
define('INNER_TIDE_REVALIDATE_SECRET', 'replace-with-a-long-random-value');
```

```dotenv
# Next.js host
REVALIDATE_SECRET=replace-with-the-same-long-random-value
```

Publishing, updating, trashing, or deleting a post or service then asks the
frontend to refresh its cached CMS content. The request is intentionally
non-blocking so a frontend outage cannot prevent an editor from saving.

## REST contract

`WORDPRESS_API_URL` must point to the v2 REST base, without a trailing slash:

```text
https://cms.inner-tide.studio/wp-json/wp/v2
```

Required public endpoints:

- `GET /posts?_embed=1` — published Blog and News articles
- `GET /posts?slug={slug}&_embed=1` — one article
- `GET /categories?slug=news` — resolve the News category
- `GET /posts?categories={id}&_embed=1` — News listing
- `GET /services?_embed=1` — published services
- `GET /services?slug={slug}&_embed=1` — one service

Every post/service response must expose:

- native `title.rendered`, `excerpt.rendered`, `content.rendered`, `slug`,
  `date`, and `modified`;
- `_embedded.wp:featuredmedia[0]` when a featured image is set;
- `yoast_head_json` from Yoast SEO;
- `acf` for the Service details fields.

Check the contract with:

```bash
curl 'https://cms.inner-tide.studio/wp-json/wp/v2/services?_embed=1'
curl 'https://cms.inner-tide.studio/wp-json/wp/v2/posts?_embed=1'
```

Keep WordPress core and plugins updated, restrict administrator access, and
back up both the database and uploads. No WordPress credentials are required by
the public frontend because it reads published content only.

