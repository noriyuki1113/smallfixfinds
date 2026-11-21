export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { CATEGORIES, GUIDES, ITEM } from "../lib/content";

const BASE = "https://www.smallfixfinds.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "", "/guides", "/collections", "/items", "/about", "/privacy",
    "/tools/will-it-fit-over-sink-rack",
    "/free/small-space-measuring-worksheet",
    ...GUIDES.map((g) => `/guides/${g.slug}`),
    ...CATEGORIES.map((c) => `/categories/${c.slug}`),
    `/items/${ITEM.slug}`,
  ];
  // Note: /problems/* and /collections/* detail pages were noindex/review-state
  // on the live site (absent from its sitemap), so problems stay out of the
  // sitemap here too; collections detail pages were also absent live.
  return routes.map((r) => ({ url: `${BASE}${r}` }));
}
