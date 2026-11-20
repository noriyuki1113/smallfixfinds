import { notFound } from "next/navigation";
import { GUIDES, guideBySlug } from "../../../lib/content";
import { GUIDE_BODIES } from "../../../lib/guides-body";
import { AffiliateDisclosure, GuideCard, ItemCard } from "../../../components/cards";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  return { title: g ? `${g.title} | Small Fix Finds` : "Guide | Small Fix Finds" };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  const body = GUIDE_BODIES[slug];
  if (!guide || !body) notFound();
  const related = GUIDES.filter((g) => g.slug !== slug);
  const showItem = slug !== "cable-management-small-desks";
  return (
    <article>
      <p style={{ color: "#666", fontSize: 14 }}>Home / <a href="/guides">Guides</a> / {guide.title} · <a href={`/categories/${guide.categorySlug}`}>{guide.category}</a></p>
      <h1>{guide.title}</h1>
      <p>{guide.intro}</p>
      <p style={{ color: "#666", fontSize: 14 }}>By Small Fix Finds Editorial Desk · Updated {guide.updated}<br />
      Illustrative visual. Check the linked listing and measurements for current product details.</p>

      <h2>On this page</h2>
      <ul>{body.sections.map((s) => <li key={s.heading}>{s.heading}</li>)}</ul>

      {body.sections.map((s) => (
        <section key={s.heading}>
          <h2>{s.heading}</h2>
          {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
        </section>
      ))}
      <ul>{body.closingBullets.map((b) => <li key={b}>{b}</li>)}</ul>
      <AffiliateDisclosure />

      <h2>Related finds</h2>
      {showItem ? <ItemCard /> : <p>Finds are being reviewed. We are still checking products related to this guide.</p>}

      <h2>Related guides</h2>
      {related.map((g) => <GuideCard key={g.slug} guide={g} />)}
    </article>
  );
}
