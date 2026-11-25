"use client";
// Tension Rod Fit Checker — client component.
// Route target: /tools/will-it-fit-tension-rod/
// Logic lives in ../lib/tension-rod-fit-logic.ts — keep verdict rules there only.
import { useMemo, useState } from "react";
import { checkTensionRodFit, ROD_PRESETS, type Unit } from "../lib/tension-rod-fit-logic";

const VERDICT_LABEL = { fits: "Fits", tight: "Tight — check first", "wont-fit": "Won't fit" } as const;

export default function TensionRodFitChecker() {
  const [unit, setUnit] = useState<Unit>("in");
  const [preset, setPreset] = useState("m");
  const [opening, setOpening] = useState("");
  const [rodMin, setRodMin] = useState("");
  const [rodMax, setRodMax] = useState("");
  const [obstruction, setObstruction] = useState(false);
  const [flatWalls, setFlatWalls] = useState(true);

  const range = useMemo(() => {
    const p = ROD_PRESETS.find((r) => r.id === preset);
    if (p && p.minIn > 0) return { min: p.minIn, max: p.maxIn };
    return { min: parseFloat(rodMin) || 0, max: parseFloat(rodMax) || 0 };
  }, [preset, rodMin, rodMax]);

  const result = useMemo(() => {
    const o = parseFloat(opening);
    if (!o || !(range.min > 0)) return null;
    return checkTensionRodFit({
      openingWidth: o, rodMinIn: range.min, rodMaxIn: range.max,
      hasObstruction: obstruction, wallsFlatParallel: flatWalls, unit,
    });
  }, [opening, range, obstruction, flatWalls, unit]);

  return (
    <section aria-label="Tension rod fit checker">
      <h2>Will this tension rod fit your opening?</h2>
      <p>Measure the opening at the exact height the rod will sit — under-sink cabinets and shower walls change width with height — then match it against the rod's stated range. The middle of the range is where a rod holds best.</p>

      <label>Unit (opening width)
        <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
          <option value="in">inches</option>
          <option value="cm">cm</option>
        </select>
      </label>

      <label>Opening width, wall to wall ({unit})
        <input inputMode="decimal" value={opening} onChange={(e) => setOpening(e.target.value)} placeholder={unit === "in" ? "e.g. 30" : "e.g. 76"} />
      </label>

      <label>Rod size
        <select value={preset} onChange={(e) => setPreset(e.target.value)}>
          {ROD_PRESETS.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
      </label>
      {preset === "custom" && (
        <>
          <label>Rod's shortest setting (in)
            <input inputMode="decimal" value={rodMin} onChange={(e) => setRodMin(e.target.value)} placeholder="e.g. 23.6" />
          </label>
          <label>Rod's longest setting (in)
            <input inputMode="decimal" value={rodMax} onChange={(e) => setRodMax(e.target.value)} placeholder="e.g. 35.4" />
          </label>
        </>
      )}

      <label>
        <input type="checkbox" checked={obstruction} onChange={(e) => setObstruction(e.target.checked)} />
        Pipes or a fitting sit at the height I want to mount the rod
      </label>
      <label>
        <input type="checkbox" checked={flatWalls} onChange={(e) => setFlatWalls(e.target.checked)} />
        Both mounting surfaces are flat and parallel
      </label>

      {result && (
        <div data-verdict={result.verdict}>
          <h3>{VERDICT_LABEL[result.verdict]}</h3>
          <ul>{result.reasons.map((r) => <li key={r}>{r}</li>)}</ul>
          <h4>Renter check</h4>
          <ul>{result.renterCheck.map((r) => <li key={r}>{r}</li>)}</ul>
          <p><small>This is a general fit check. Rod ranges and weight limits come from each maker's listing — verify them there, and re-measure the opening at the exact mounting height before ordering.</small></p>
        </div>
      )}
    </section>
  );
}
