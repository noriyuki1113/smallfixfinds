import { notFound } from "next/navigation";
import { COLLECTIONS, GUIDES, guideBySlug } from "../../../lib/content";
import { GuideCard, ItemCard } from "../../../components/cards";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = COLLECTIONS.find((x) => x.slug === slug);
  return { title: c ? `${c.name} | Small Fix Finds` : "Collection | Small Fix Finds" };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = COLLECTIONS.find((x) => x.slug === slug);
  if (!c) notFound();
  const guide = guideBySlug(c.guideSlug)!;
  const more = GUIDES.filter((g) => g.slug !== c.guideSlug);
  return (
    <article>
      <p style={{ color: "#666", fontSize: 14 }}>Home / <a href="/collections">Collections</a> / {c.name}</p>
      <p style={{ letterSpacing: 2, fontSize: 13, color: "#666" }}>{c.kind.toUpperCase()}</p>
      <h1>{c.name}</h1>
      <p>{c.intro}</p>
      <p>Who this is for: {c.whoFor}</p>
      {c.beforeChoose && (
        <><h2>Before you choose</h2>
        <p>Check these details against your space and the current listing:</p>
        <ul>{c.beforeChoose.map((b) => <li key={b}>{b}</li>)}</ul></>
      )}
      <h2>Start with the practical guide</h2>
      <GuideCard guide={guide} />
      <h2>Ideas to consider</h2>
      {c.hasItem ? <ItemCard /> : <p>This collection is being refreshed. We are checking the current finds for this collection.</p>}
      <h2>Why these fixes are together</h2>
      <p>{c.why}</p>
      <p style={{ color: "#666", fontSize: 14 }}>This collection is being reviewed before it is included in search results.</p>
      <h2>More guides for this problem</h2>
      {more.map((g) => <GuideCard key={g.slug} guide={g} />)}
    </article>
  );
}
