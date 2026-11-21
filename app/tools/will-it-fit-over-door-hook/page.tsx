import OverDoorFitChecker from "../../../components/OverDoorFitChecker";

export const metadata = {
  title: "Will It Fit? Over-Door Hook Fit Checker | Small Fix Finds",
  description: "Measure your door thickness and the gap above the door, and get a verdict — Fits, Tight, or Won't fit — before you buy over-door hooks or racks.",
};

export default function Page() {
  return (
    <article>
      <h1>Will an over-door hook fit your door?</h1>
      <p>
        Over-door hooks look universal. They are not. Hooks are made for a specific door thickness,
        and the flat bracket still has to pass through the gap above the closed door. Two
        measurements decide whether a hook works on your door — or marks it up trying.
      </p>
      <h2>Measure first</h2>
      <ol>
        <li><strong>Measure the door thickness.</strong> Open the door and measure the slab edge. Most interior doors are 1-3/8"; exterior doors are often 1-3/4". Do not guess from the listing photo.</li>
        <li><strong>Measure the gap above the door.</strong> Close the door and gauge the space between the top of the door and the frame. A stack of coins or a folded card works. The bracket's flat bar has to pass through this gap every time the door closes.</li>
        <li><strong>Match the hook to the door, not the other way round.</strong> A hook made for a thinner door will not go on; a hook made for a much thicker door swings and rattles.</li>
      </ol>
      <OverDoorFitChecker />
      <h2>When to pass</h2>
      <p>
        Skip over-door hooks if the top gap is paper-thin, the door is a sliding or bifold style, or
        the load is heavy — a loaded coat rack belongs on a stud-mounted rail in a home you own, not
        on a rental door. Adhesive hooks rated for the load, or a tension rod inside a closet frame,
        are the usual renter-safe fallbacks.
      </p>
      <p>
        Related: <a href="/guides/renter-friendly-storage-no-drilling">Renter-Friendly Storage Ideas That Need No Drilling</a> — where over-door storage fits into a no-hole setup.
      </p>
      <p>
        Measuring the whole room? Grab the free <a href="/free/small-space-measuring-worksheet">Small-Room Measuring Worksheet</a> — it has rows for door thickness and top clearance, plus kitchen, desk, bathroom and entryway.
      </p>
    </article>
  );
}
