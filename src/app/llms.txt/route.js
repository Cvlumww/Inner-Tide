import { getSiteUrl } from "@/lib/site";

export function GET() {
  const siteUrl = getSiteUrl();
  const content = `# Inner Tide Studios

Inner Tide Studios is a boutique reformer Pilates studio at Second Floor,
16 Fitzroy Place, Finnieston, Glasgow, G3 7RW.

The studio offers small-group reformer Pilates classes and private sessions.
Its classes focus on strength, mobility, balance, posture, core control, and
wellbeing, with options suitable for beginners and progressing clients.

Official pages:
- Home: ${siteUrl}/
- Services: ${siteUrl}/services
- Blog: ${siteUrl}/blog
- News: ${siteUrl}/news
- Booking: ${siteUrl}/#booking

Contact: emma@inner-tide.studio

This file is a concise discovery aid. The linked public pages are the canonical
source for current service and business information.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

