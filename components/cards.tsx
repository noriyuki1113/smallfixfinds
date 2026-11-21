import { AMAZON_URL, ITEM, type GuideSummary } from "../lib/content";

export function GuideCard({ guide }: { guide: GuideSummary }) {
  return (
    <article className="card">
      <p className="meta">{guide.category} · Guide · Updated {guide.updated}</p>
      <h3><a href={`/guides/${guide.slug}`}>{guide.title}</a></h3>
      <p>{guide.blurb}</p>
      <p><a href={`/guides/${guide.slug}`}>Read the guide</a></p>
    </article>
  );
}

export function ItemCard() {
  return (
    <article className="card">
      <p className="meta">{ITEM.category} · Researched · Illustrative image—not the actual product</p>
      <h3><a href={`/items/${ITEM.slug}`}>{ITEM.name}</a></h3>
      <p>{ITEM.why} Updated {ITEM.updated}</p>
      <p>
        Solves: <a href={`/problems/${ITEM.solvesSlug}`}>{ITEM.solves}</a><br />
        Best for: {ITEM.bestFor}<br />
        Setup: {ITEM.setup}<br />
        Measure first: {ITEM.measure}
      </p>
      <p>
        <a href={`/items/${ITEM.slug}`}>See the details</a> ·{" "}
        <a href={AMAZON_URL} rel="sponsored nofollow noopener" target="_blank">Check current price on Amazon</a>
      </p>
    </article>
  );
}

export function AffiliateDisclosure() {
  return (
    <p className="meta">
      Affiliate disclosure: As an Amazon Associate I earn from qualifying purchases. We may earn a commission if you buy through links on this site; it does not change the price you pay.
    </p>
  );
}
