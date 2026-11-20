import { notFound } from "next/navigation";
import { CATEGORIES, guideBySlug } from "../../../lib/content";
import { GuideCard, ItemCard } from "../../../components/cards";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CATEGORIES.find((x) => x.slug === slug);
  return { title: c ? `${c.name} Ideas, Guides & Finds | Small Fix Finds` : "Category | Small Fix Finds" };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CATEGORIES.find((x) => x.slug === slug);
  if (!c) notFound();
  const guide = guideBySlug(c.guideSlug)!;
  const hasItem = c.slug === "small-kitchen";
  return (
    <article>
      <p style={{ color: "#666", fontSize: 14 }}>Home / Categories / {c.name}</p>
      <p style={{ letterSpacing: 2, fontSize: 13, color: "#666" }}>TOPIC HUB</p>
      <h1>{c.name}</h1>
      <p>{c.description}</p>
      <h2>Start with a problem</h2>
      <h3>{c.problemTitle}</h3>
      <p>{c.problemDescription}</p>
      <p><a href={`/problems/${c.problemSlug}`}>Explore ideas for this problem</a></p>
      <h2>Featured guide</h2>
      <GuideCard guide={guide} />
      <h2>Collections</h2>
      <p>No collections yet. We are still grouping useful finds for this topic.</p>
      <h2>Finds</h2>
      {hasItem ? <ItemCard /> : <p>Finds are being reviewed. We are still checking ideas for this topic.</p>}
    </article>
  );
}
