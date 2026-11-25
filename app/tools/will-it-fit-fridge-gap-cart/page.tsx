import FridgeGapFitChecker from "../../../components/FridgeGapFitChecker";

export const metadata = {
  title: "Will It Fit? Fridge Gap Slim Cart Fit Checker | Small Fix Finds",
  description: "Measure the gap beside your fridge — baseboard and handle included — and get a verdict, Fits, Tight, or Won't fit, before you buy a slim rolling cart.",
};

export default function Page() {
  return (
    <article>
      <h1>Will a slim cart fit in the gap beside your fridge?</h1>
      <p>
        The gap beside the fridge looks like free storage, and slim rolling carts are sold for
        exactly that slot. But the width you measure at counter height is not the width the
        cart gets: the baseboard steals some at the floor, the fridge handle steals some at
        the front, and if the gap is the air clearance the fridge manual requires, it is not
        free at all. Measure all of it and the cart decision makes itself.
      </p>
      <h2>Measure first</h2>
      <ol>
        <li><strong>Measure the gap twice.</strong> Once at counter height, once at the floor. The smaller number is the real one — baseboards and uneven walls live at the bottom.</li>
        <li><strong>Measure what protrudes.</strong> How far the baseboard sticks out from the wall, and how far the fridge handle reaches toward the gap at cart height.</li>
        <li><strong>Check the manual before the cart.</strong> Many fridges specify a side air clearance. If this gap is that clearance, it is ventilation, not storage.</li>
      </ol>
      <FridgeGapFitChecker />
      <h2>When to pass</h2>
      <p>
        Skip the cart if it only fits by being forced — a cart that scrapes in will scrape the
        floor every time it comes out. A gap that fails on width often still works for flat
        storage (a folded step stool, a tray) that does not need to roll. And never trade the
        fridge's ventilation for a spice rack.
      </p>
      <p>
        Measuring the whole kitchen? Grab the free <a href="/free/small-space-measuring-worksheet">Small-Room Measuring Worksheet</a>, and check the other tight spot in most kitchens with the <a href="/tools/will-it-fit-under-sink-organizer">under-sink organizer fit checker</a>.
      </p>
    </article>
  );
}
