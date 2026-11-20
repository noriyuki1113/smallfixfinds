import { notFound } from "next/navigation";
import { AMAZON_URL, GUIDES, ITEM, PROBLEMS } from "../../../lib/content";
import { GuideCard } from "../../../components/cards";
import OverSinkFitChecker from "../../../components/OverSinkFitChecker";

export function generateStaticParams() {
  return [{ slug: ITEM.slug }];
}

export const metadata = { title: `${ITEM.name} | Small Fix Finds` };

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== ITEM.slug) notFound();
  const problems = PROBLEMS.filter((p) => ITEM.problemSlugs.includes(p.slug));
  return (
    <article>
      <p style={{ color: "#666", fontSize: 14 }}>Home / <a href="/items">Finds</a> / <a href="/categories/small-kitchen">Small Kitchen</a> / {ITEM.name}</p>
      <p><a href="/items">Back to all finds</a></p>
      <p style={{ color: "#666", fontSize: 14 }}>{ITEM.category} · Researched · Illustrative image—not the actual Amazon product. Color, shape, and included parts may differ.</p>
      <h1>{ITEM.name}</h1>
      <p>{ITEM.summary}</p>
      <p><strong>Why it may help:</strong> {ITEM.why}</p>

      <h2>Decide before you click</h2>
      <ul>
        <li><strong>Good fit for:</strong> {ITEM.goodFor}</li>
        <li><strong>Probably not for:</strong> {ITEM.notFor}</li>
        <li><strong>Useful when:</strong> {ITEM.usefulWhen}</li>
        <li><strong>Measure and check first:</strong> {ITEM.measureFirst}</li>
      </ul>
      <p style={{ color: "#666", fontSize: 14 }}>Researched: This page summarizes listed specifications and likely fit. It is not a claim of first-hand use.</p>
      <p>
        <a href={AMAZON_URL} rel="sponsored nofollow noopener" target="_blank"><strong>Check details on Amazon</strong></a>
      </p>
      <p style={{ color: "#555", fontSize: 14 }}>
        As an Amazon Associate I earn from qualifying purchases. Prices, shipping, product details, and availability may change. Confirm the current listing before ordering. Listing details last checked: {ITEM.updated}
      </p>

      <h2>Will an over-sink rack fit your sink?</h2>
      <p>A rack needs a stable place to rest on both sides. A matching number on a listing does not guarantee that the rack fits your sink.</p>
      <ul>
        <li><strong>Measure the usable span.</strong> Measure across the sink where both ends of the rack would actually rest. Check the front-to-back space as well.</li>
        <li><strong>Check the resting edges.</strong> Look for a flat, stable contact point on each side. Note raised rims, rounded corners, faucet bases and nearby handles.</li>
        <li><strong>Compare the selected variant.</strong> Open the linked listing and check the exact size, orientation, materials and load guidance for the variant you would order.</li>
      </ul>
      <p><strong>When to pass:</strong> Skip this style if the ends cannot rest securely, the faucet blocks the rack, or you need a freestanding rack for a larger load.</p>
      <p><strong>Before buying anything:</strong> Try drying a smaller batch on an existing towel or rack, then put it away when the counter is needed. These are general fit checks based on the product type. Verify the dimensions and instructions of the current listing before ordering.</p>

      <h3>Try the interactive checker</h3>
      <p>Same checks, with a verdict: <a href="/tools/will-it-fit-over-sink-rack">Will It Fit? Over-Sink Rack Fit Checker</a></p>
      <OverSinkFitChecker amazonUrl={AMAZON_URL} />

      <h2>Problems this may help with</h2>
      <ul>
        {problems.map((p) => <li key={p.slug}><a href={`/problems/${p.slug}`}>{p.title.toLowerCase()}</a></li>)}
      </ul>

      <h2>Guides for this kind of problem</h2>
      {GUIDES.map((g) => <GuideCard key={g.slug} guide={g} />)}
    </article>
  );
}
