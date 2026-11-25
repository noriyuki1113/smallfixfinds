import SofaFitChecker from "../../../components/SofaFitChecker";

export const metadata = {
  title: "Will It Fit? Sofa Through Door Fit Checker | Small Fix Finds",
  description: "Measure your door's clear opening and your sofa's depth and height, and get a verdict — Fits, Tight, or Won't fit — before the delivery truck arrives.",
};

export default function Page() {
  return (
    <article>
      <h1>Will a sofa fit through your door?</h1>
      <p>
        Sofas are returned every day because of one number nobody measured: the door's clear
        opening. A "36-inch door" is not a 36-inch opening — the frame, the stops and the open
        slab itself leave about 33.5 inches. And the sofa dimension that has to cross that
        opening is not its length; it is the smaller of its depth and its back height. Measure
        those, and most delivery-day surprises never happen.
      </p>
      <h2>Measure first</h2>
      <ol>
        <li><strong>Measure the clear opening, not the slab.</strong> With the door fully open, measure frame to frame at the narrowest point, and floor to the top of the frame. Every door on the route counts — the narrowest one decides.</li>
        <li><strong>Measure the sofa's depth and back height.</strong> Depth is back to front, height is floor to the top of the back frame (cushions compress; frames do not). If the legs unscrew, measure their height too — those inches come off the height.</li>
        <li><strong>Walk the route.</strong> Hallway width, the turn after the door, stairs and elevators can each veto a sofa the front door allows. Note any tight 90-degree turn and the hallway width.</li>
      </ol>
      <SofaFitChecker />
      <h2>When to pass</h2>
      <p>
        Skip the sofa if it misses the doorway even with the legs off and the door off its
        hinges — delivery crews cannot change arithmetic, and a refused delivery usually
        still costs a fee. A sectional that ships in pieces, or a sofa with a lower back,
        solves the same room without the gamble. And if the door passes but the turn does
        not, ask the retailer about their room-of-choice delivery terms before you order,
        not from the hallway.
      </p>
      <p>
        Measuring the whole room? Grab the free <a href="/free/small-space-measuring-worksheet">Small-Room Measuring Worksheet</a> — it has a doorway row, plus kitchen, doors, desk, bathroom and entryway.
      </p>
      <p>
        Smaller buys, same idea: <a href="/tools/will-it-fit-over-sink-rack">over-sink rack fit checker</a>, <a href="/tools/will-it-fit-over-door-hook">over-door hook fit checker</a> and <a href="/tools/will-it-fit-under-sink-organizer">under-sink organizer fit checker</a>.
      </p>
    </article>
  );
}
