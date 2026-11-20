import OverSinkFitChecker from "../../../components/OverSinkFitChecker";

export const metadata = {
  title: "Will It Fit? Over-Sink Rack Fit Checker | Small Fix Finds",
  description: "Measure your sink opening and get a verdict — Fits, Tight, or Won't fit — before you buy an over-sink roll-up dish drying rack.",
};

// NOTE for production integration: replace this placeholder with the same
// affiliate URL used on /items/roll-up-drying-mat (do not invent a tag here).
const AMAZON_URL = undefined;

export default function Page() {
  return (
    <article>
      <h1>Will an over-sink rack fit your sink?</h1>
      <p>
        A rack needs a stable place to rest on both sides. A matching number on a listing does not
        guarantee that the rack fits your sink — this checker turns the measurements into a verdict.
      </p>
      <h2>Measure first</h2>
      <ol>
        <li><strong>Measure the usable span.</strong> Measure across the sink where both ends of the rack would actually rest — not the outer rim.</li>
        <li><strong>Check the resting edges.</strong> Look for a flat, stable contact point on each side. Note raised rims, rounded corners, faucet bases and nearby handles.</li>
        <li><strong>Compare the selected variant.</strong> Check the exact size and orientation on the current listing before ordering.</li>
      </ol>
      <OverSinkFitChecker amazonUrl={AMAZON_URL} />
      <h2>When to pass</h2>
      <p>
        Skip this style if the ends cannot rest securely, the faucet blocks the rack, or you need a
        freestanding rack for a larger load. Before buying anything, try drying a smaller batch on an
        existing towel or rack, then put it away when the counter is needed.
      </p>
      <p>
        Related: <a href="https://www.smallfixfinds.com/items/roll-up-drying-mat">Tomorotec 17.7" × 15.5" Roll-Up Dish Drying Rack — the find this checker was built for</a>
      </p>
    </article>
  );
}
