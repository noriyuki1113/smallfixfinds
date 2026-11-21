import type { Metadata } from "next";
import PrintButton from "../../../components/PrintButton";

export const metadata: Metadata = {
  title: "Measure Before You Buy — The Small-Room Measuring Worksheet (Free) | Small Fix Finds",
  description:
    "A free one-page worksheet: the exact measurements to write down before ordering small-space fixes — kitchen, doors, desk, bathroom and entryway.",
};

const SECTIONS: { title: string; rows: string[] }[] = [
  {
    title: "Kitchen",
    rows: [
      "Sink opening span (where a rack's ends would rest)",
      "Sink front-to-back depth",
      "Faucet base to far edge",
      "Under-sink: width × height × depth (note pipes)",
      "Cabinet door swing clearance",
    ],
  },
  {
    title: "Doors & Closet",
    rows: [
      "Door thickness (for over-door hooks)",
      "Door top clearance (door to frame)",
      "Closet rod to floor",
      "Shelf depth",
    ],
  },
  {
    title: "Desk",
    rows: [
      "Desk width × depth",
      "Cable drop: desk back edge to outlet",
      "Monitor / shelf underside height",
    ],
  },
  {
    title: "Bathroom & Entryway",
    rows: [
      "Shower wall width",
      "Tub ledge width",
      "Entryway wall run",
      "Nearest outlet distance",
    ],
  },
];

export default function Page() {
  return (
    <article>
      <p className="eyebrow">Free worksheet</p>
      <h1>Measure Before You Buy — The Small-Room Measuring Worksheet</h1>
      <p>
        Most small fixes that get returned were not bad products — they were bought before anyone
        measured. Print this one page, walk your rooms once with a tape measure, and write down the
        numbers you will actually need. Measure the <strong>usable opening or space</strong> — not
        the outer edge — before you order anything.
      </p>
      <PrintButton />
      {SECTIONS.map((s) => (
        <section key={s.title} className="sheet">
          <h2>{s.title}</h2>
          {s.rows.map((r) => (
            <p key={r} className="sheet-row">
              <span>{r}</span>
              <span className="sheet-blank" aria-hidden="true" />
              <span className="sheet-unit">in</span>
            </p>
          ))}
        </section>
      ))}
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Rule of thumb</h2>
        <p>
          A fix that rests, hangs, or slides in needs at least <strong>0.5&quot; of margin per
          side</strong>. If your number is within 0.5&quot; of the product size, treat it as{" "}
          <strong>Tight</strong> — measure again before buying.
        </p>
      </div>
      <h2>Turn the numbers into a verdict</h2>
      <p>
        Got your sink span? Put it into the{" "}
        <a href="/tools/will-it-fit-over-sink-rack">over-sink rack fit checker</a> and get a Fits /
        Tight / Won&apos;t fit answer before you spend anything.
      </p>
      <p className="no-print">
        Coming soon: the Small-Space Fit Kit turns these measurements into a verdict for 12 common
        product types, with room-by-room no-drill checklists. This worksheet stays free.
      </p>
    </article>
  );
}
