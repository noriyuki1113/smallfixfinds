import { notFound } from "next/navigation";
import { PROBLEMS, guideBySlug } from "../../../lib/content";
import { GuideCard, ItemCard } from "../../../components/cards";

export function generateStaticParams() {
  return PROBLEMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROBLEMS.find((x) => x.slug === slug);
  return { title: p ? `${p.title} | Small Fix Finds` : "Problem | Small Fix Finds" };
}

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROBLEMS.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <article>
      <p style={{ color: "#666", fontSize: 14 }}>Home / Problems / <a href={`/categories/${p.categorySlug}`}>{p.categoryName}</a> / {p.title}</p>
      <p style={{ letterSpacing: 2, fontSize: 13, color: "#666" }}>A SMALL PROBLEM, A CLEARER NEXT STEP</p>
      <h1>{p.title}</h1>
      <p>{p.description}</p>
      <p>Start with the idea that fits your space, then check the measurements and tradeoffs before choosing a product.</p>
      <h2>Guides to help you think it through</h2>
      {p.guideOrder.map((s) => { const g = guideBySlug(s)!; return <GuideCard key={s} guide={g} />; })}
      {p.hasItem && (<><h2>Finds that may fit</h2><ItemCard /></>)}
    </article>
  );
}
