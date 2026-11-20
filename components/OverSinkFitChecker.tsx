"use client";
// Over-Sink Rack Fit Checker — drop into the Next.js repo as a client component.
// Route target: /tools/will-it-fit-over-sink-rack/
// Also embed from /items/roll-up-drying-mat in place of (or below) the text checklist.
// Logic lives in ./fit-logic.ts — keep verdict rules there only.
import { useMemo, useState } from "react";
import { checkOverSinkFit, DEFAULT_RACK, type Edges, type Faucet, type Unit } from "../lib/fit-logic";

const VERDICT_LABEL = { fits: "Fits", tight: "Tight — check first", "wont-fit": "Won't fit" } as const;

export default function OverSinkFitChecker({ amazonUrl }: { amazonUrl?: string }) {
  const [unit, setUnit] = useState<Unit>("in");
  const [span, setSpan] = useState("");
  const [depth, setDepth] = useState("");
  const [faucet, setFaucet] = useState<Faucet>("unsure");
  const [edges, setEdges] = useState<Edges>("unsure");

  const result = useMemo(() => {
    const s = parseFloat(span);
    if (!s) return null;
    return checkOverSinkFit({ sinkSpan: s, sinkDepth: parseFloat(depth) || 0, unit, faucet, edges });
  }, [span, depth, unit, faucet, edges]);

  return (
    <section aria-label="Over-sink rack fit checker">
      <h2>Will an over-sink rack fit your sink?</h2>
      <p>Measure the usable opening — not the outer rim — where both ends of the rack would actually rest.</p>

      <label>Unit
        <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
          <option value="in">inches</option>
          <option value="cm">cm</option>
        </select>
      </label>
      <label>Sink opening span ({unit})
        <input inputMode="decimal" value={span} onChange={(e) => setSpan(e.target.value)} placeholder={unit === "in" ? "e.g. 15.5" : "e.g. 39"} />
      </label>
      <label>Sink front-to-back depth ({unit})
        <input inputMode="decimal" value={depth} onChange={(e) => setDepth(e.target.value)} placeholder={unit === "in" ? "e.g. 16" : "e.g. 41"} />
      </label>
      <label>Faucet clearance
        <select value={faucet} onChange={(e) => setFaucet(e.target.value as Faucet)}>
          <option value="clear">Clear — nothing blocks the rack</option>
          <option value="tight">Tight — faucet base or handles are close</option>
          <option value="unsure">Not sure yet</option>
        </select>
      </label>
      <label>Resting edges
        <select value={edges} onChange={(e) => setEdges(e.target.value as Edges)}>
          <option value="flat">Flat on both sides</option>
          <option value="rounded">Rounded or raised rim</option>
          <option value="unsure">Not sure yet</option>
        </select>
      </label>

      <p>Checking against: {DEFAULT_RACK.name}</p>

      {result && (
        <div data-verdict={result.verdict}>
          <h3>{VERDICT_LABEL[result.verdict]}</h3>
          <ul>{result.reasons.map((r) => <li key={r}>{r}</li>)}</ul>
          {result.verdict === "fits" && amazonUrl && (
            <p><a href={amazonUrl} rel="sponsored nofollow noopener" target="_blank">Check current price on Amazon</a><br />
            <small>As an Amazon Associate I earn from qualifying purchases.</small></p>
          )}
          {result.verdict !== "fits" && (
            <p>Passing on a bad fit is the right call. A safer minimum rack length for your sink is {result.recommendedMinRackLengthIn}".</p>
          )}
          <p><small>This is a general fit check based on listed dimensions. Verify the exact size, orientation, and load guidance on the current listing before ordering.</small></p>
        </div>
      )}
    </section>
  );
}
