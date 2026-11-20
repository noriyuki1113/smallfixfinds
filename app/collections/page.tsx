import { COLLECTIONS, GUIDES } from "../../lib/content";
import { GuideCard } from "../../components/cards";

export const metadata = { title: "Collections for Small-Space Problems | Small Fix Finds" };

export default function CollectionsIndex() {
  return (
    <div>
      <p style={{ color: "#666", fontSize: 14 }}>Home / Collections</p>
      <p style={{ letterSpacing: 2, fontSize: 13, color: "#666" }}>COLLECTIONS</p>
      <h1>Useful ideas, grouped by what you need.</h1>
      <p>Browse by room, constraint or goal. We explain the checks that help you decide whether an idea fits.</p>
      <h2>Explore collections</h2>
      {COLLECTIONS.map((c) => (
        <article key={c.slug} style={{ border: "1px solid #ddd", borderRadius: 10, padding: 16, margin: "12px 0" }}>
          <h3><a href={`/collections/${c.slug}`}>{c.name}</a></h3>
          <p>{c.intro}</p>
        </article>
      ))}
      <p>Product collections are being refreshed. Start with a practical guide while we recheck the listings.</p>
      {GUIDES.map((g) => <GuideCard key={g.slug} guide={g} />)}
    </div>
  );
}
