import { GUIDES } from "../../lib/content";
import { GuideCard } from "../../components/cards";

export const metadata = { title: "Practical Guides for Small Spaces | Small Fix Finds" };

export default function GuidesIndex() {
  return (
    <div>
      <p style={{ color: "#666", fontSize: 14 }}>Home / Guides</p>
      <p style={{ letterSpacing: 2, fontSize: 13, color: "#666" }}>PRACTICAL GUIDES</p>
      <h1>Small ideas for everyday friction.</h1>
      <p>Clear, useful starting points for small kitchens, compact homes and better desks. Each guide keeps measurements and tradeoffs close to the idea.</p>
      <h2>All guides</h2>
      {GUIDES.map((g) => <GuideCard key={g.slug} guide={g} />)}
    </div>
  );
}
