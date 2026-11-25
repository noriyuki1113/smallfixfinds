"use client";
// Fridge-Gap Slim Cart Fit Checker — client component.
// Route target: /tools/will-it-fit-fridge-gap-cart/
// Logic lives in ../lib/fridge-gap-fit-logic.ts — keep verdict rules there only.
import { useMemo, useState } from "react";
import { checkFridgeGapFit, type Unit } from "../lib/fridge-gap-fit-logic";

const VERDICT_LABEL = { fits: "Fits", tight: "Tight — check first", "wont-fit": "Won't fit" } as const;

export default function FridgeGapFitChecker() {
  const [unit, setUnit] = useState<Unit>("in");
  const [gapW, setGapW] = useState("");
  const [gapD, setGapD] = useState("");
  const [base, setBase] = useState("");
  const [handle, setHandle] = useState("");
  const [cartW, setCartW] = useState("");
  const [cartD, setCartD] = useState("");
  const [vent, setVent] = useState(false);

  const result = useMemo(() => {
    const nums = [gapW, gapD, cartW, cartD].map((v) => parseFloat(v));
    if (nums.some((n) => !n)) return null;
    return checkFridgeGapFit({
      gapWidth: nums[0], gapDepth: nums[1],
      baseboardProtrusion: parseFloat(base) || 0,
      handleProtrusion: parseFloat(handle) || 0,
      cartWidth: nums[2], cartDepth: nums[3],
      isVentilationClearance: vent, unit,
    });
  }, [gapW, gapD, base, handle, cartW, cartD, vent, unit]);

  const ph = (inch: string, cm: string) => (unit === "in" ? inch : cm);

  return (
    <section aria-label="Fridge gap slim cart fit checker">
      <h2>Will a slim cart fit in the gap beside your fridge?</h2>
      <p>Measure the gap at the floor as well as at counter height. The baseboard at the bottom and the fridge handle at the front both take a bite out of the width the cart actually gets.</p>

      <label>Unit
        <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
          <option value="in">inches</option>
          <option value="cm">cm</option>
        </select>
      </label>

      <h3>The gap</h3>
      <label>Gap width, wall to fridge side ({unit})
        <input inputMode="decimal" value={gapW} onChange={(e) => setGapW(e.target.value)} placeholder={ph("e.g. 7", "e.g. 18")} />
      </label>
      <label>Gap depth, wall to the fridge front ({unit})
        <input inputMode="decimal" value={gapD} onChange={(e) => setGapD(e.target.value)} placeholder={ph("e.g. 24", "e.g. 61")} />
      </label>
      <label>Baseboard protrusion into the gap ({unit}) — optional
        <input inputMode="decimal" value={base} onChange={(e) => setBase(e.target.value)} placeholder={ph("e.g. 0.75", "e.g. 2")} />
      </label>
      <label>Fridge handle protrusion into the gap ({unit}) — optional
        <input inputMode="decimal" value={handle} onChange={(e) => setHandle(e.target.value)} placeholder={ph("e.g. 0", "e.g. 0")} />
      </label>
      <label>
        <input type="checkbox" checked={vent} onChange={(e) => setVent(e.target.checked)} />
        This gap is the air clearance my fridge manual requires
      </label>

      <h3>The cart</h3>
      <label>Cart width ({unit})
        <input inputMode="decimal" value={cartW} onChange={(e) => setCartW(e.target.value)} placeholder={ph("e.g. 6.5", "e.g. 17")} />
      </label>
      <label>Cart depth ({unit})
        <input inputMode="decimal" value={cartD} onChange={(e) => setCartD(e.target.value)} placeholder={ph("e.g. 22", "e.g. 56")} />
      </label>

      {result && (
        <div data-verdict={result.verdict}>
          <h3>{VERDICT_LABEL[result.verdict]}</h3>
          <ul>{result.reasons.map((r) => <li key={r}>{r}</li>)}</ul>
          <h4>Renter check</h4>
          <ul>{result.renterCheck.map((r) => <li key={r}>{r}</li>)}</ul>
          <p><small>This is a general fit check. Fridge models differ in the clearance they need — the manual's diagram wins over any checker, including this one. Verify the cart's exact dimensions on its listing before ordering.</small></p>
        </div>
      )}
    </section>
  );
}
