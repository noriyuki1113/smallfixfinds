import UnderSinkFitChecker from "../../../components/UnderSinkFitChecker";

export const metadata = {
  title: "Will It Fit? Under-Sink Organizer Fit Checker | Small Fix Finds",
  description: "Measure your cabinet and your pipes, and get a verdict — Fits, Tight, or Won't fit — before you buy an under-sink organizer.",
};

export default function Page() {
  return (
    <article>
      <h1>Will an under-sink organizer fit around your pipes?</h1>
      <p>
        Under-sink organizers are sold against the cabinet's outside size. The usable space is
        smaller: the drain, the trap and the supply lines occupy a zone from the back wall, and
        what remains in front of them is the depth you actually have. Measure the pipes first and
        most "it should have fit" returns never happen.
      </p>
      <h2>Measure first</h2>
      <ol>
        <li><strong>Measure the cabinet's inside.</strong> Width between the walls, depth from the back wall to the inside of the door, height from the floor to the top. Not the door opening — the walls.</li>
        <li><strong>Measure the pipe zone.</strong> From the back wall to the front of the pipe assembly — drain, trap, supply lines, whichever reaches furthest forward.</li>
        <li><strong>Measure under the trap.</strong> From the cabinet floor to the underside of the trap. A deeper organizer can sometimes slide under it; this number decides.</li>
      </ol>
      <UnderSinkFitChecker />
      <h2>When to pass</h2>
      <p>
        Skip the organizer if the front zone is shallower than about 8 inches — bottles and spray
        triggers need depth to stand upright. Two narrow bins, one on each side of the pipe run,
        usually beat one wide organizer in a pipe-heavy cabinet. And whatever you choose, keep the
        shutoff valves reachable.
      </p>
      <p>
        Related: <a href="/guides/small-kitchen-fixes-save-counter-space">7 Small Kitchen Fixes That Save Counter Space</a> — under-sink order is step one for most small kitchens.
      </p>
      <p>
        Measuring the whole room? Grab the free <a href="/free/small-space-measuring-worksheet">Small-Room Measuring Worksheet</a> — it has an under-sink row, plus doors, desk, bathroom and entryway.
      </p>
    </article>
  );
}
