import { CATEGORIES, GUIDES } from "../lib/content";
import { GuideCard, ItemCard } from "../components/cards";

export default function Home() {
  return (
    <div>
      <p style={{ letterSpacing: 2, fontSize: 13, color: "#666" }}>PRACTICAL IDEAS FOR SMALL SPACES</p>
      <h1>Small problems. Smart little fixes.</h1>
      <p>Small-space fixes for renters and compact homes. Check what fits before you buy.</p>
      <p><a href="/guides">Browse practical guides</a> · <a href="/tools/will-it-fit-over-sink-rack">Will an over-sink rack fit your sink? Try the fit checker →</a></p>
      <p><strong>Our approach:</strong> Start with the everyday annoyance. Then look for an idea that fits your space, routine and budget. <a href="/about">How we choose finds</a></p>

      <h2>What would you like to make easier?</h2>
      {CATEGORIES.map((c) => (
        <article key={c.slug} className="card">
          <h3><a href={`/categories/${c.slug}`}>{c.name}</a></h3>
          <p>{c.description}</p>
          <p><a href={`/categories/${c.slug}`}>See ideas</a></p>
        </article>
      ))}

      <h2>Free: measure before you buy</h2>
      <article className="card">
        <h3><a href="/free/small-space-measuring-worksheet">The Small-Room Measuring Worksheet</a></h3>
        <p>One printable page with the exact measurements to write down before ordering — kitchen, doors, desk, bathroom and entryway.</p>
        <p><a href="/free/small-space-measuring-worksheet">Get the free worksheet</a> · <a href="/tools/will-it-fit-over-sink-rack">Then check your sink span with the fit checker</a></p>
        <p><a href="/tools/will-it-fit-over-door-hook">Buying over-door hooks? Check your door thickness and top gap first</a></p>
      </article>

      <h2>Practical guides</h2>
      {GUIDES.map((g) => <GuideCard key={g.slug} guide={g} />)}

      <h2>Finds to consider</h2>
      <ItemCard />

      <h2>Renter-friendly, space-saving ideas.</h2>
      <p>Use a door, shelf or countertop a little more thoughtfully. Check the fit and mounting details before you decide.</p>
      <p><a href="/collections/renter-friendly-fixes">Explore renter-friendly fixes</a></p>
      <ol>
        <li><a href="/collections/no-drill-fixes">No-drill ideas</a> — Start with the surface and mounting method.</li>
        <li><a href="/collections/space-saving-finds">Space-saving finds</a> — Choose ideas that earn the space they use.</li>
      </ol>

      <h2>Useful context makes a better decision.</h2>
      <p>We look for small fixes that solve real everyday annoyances. We also tell you when a product probably isn’t a good fit.</p>
      <p><a href="/about">Read our research standards</a></p>
    </div>
  );
}
