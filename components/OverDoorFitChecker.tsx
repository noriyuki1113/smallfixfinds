"use client";
// Over-Door Hook Fit Checker — client component.
// Route target: /tools/will-it-fit-over-door-hook/
// Logic lives in ../lib/door-fit-logic.ts — keep verdict rules there only.
import { useMemo, useState } from "react";
import { checkOverDoorFit, HOOK_PRESETS, type Unit } from "../lib/door-fit-logic";

const VERDICT_LABEL = { fits: "Fits", tight: "Tight — check first", "wont-fit": "Won't fit" } as const;

export default function OverDoorFitChecker() {
  const [unit, setUnit] = useState<Unit>("in");
  const [thickness, setThickness] = useState("");
  const [gap, setGap] = useState("");
  const [preset, setPreset] = useState("standard");
  const [customOpening, setCustomOpening] = useState("");

  const openingIn = useMemo(() => {
    if (preset === "custom") return parseFloat(customOpening) || 0;
    return HOOK_PRESETS.find((p) => p.id === preset)?.openingIn ?? 0;
  }, [preset, customOpening]);

  const result = useMemo(() => {
    const t = parseFloat(thickness);
    if (!t || !openingIn) return null;
    return checkOverDoorFit({ doorThickness: t, topGap: parseFloat(gap) || 0, unit, hookOpeningIn: openingIn });
  }, [thickness, gap, unit, openingIn]);

  return (
    <section aria-label="Over-door hook fit checker">
      <h2>Will an over-door hook work on your door?</h2>
      <p>Two measurements decide it: how thick your door is, and how much gap sits above it when closed.</p>

      <label>Unit
        <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
          <option value="in">inches</option>
          <option value="cm">cm</option>
        </select>
      </label>
      <label>Door thickness ({unit})
        <input inputMode="decimal" value={thickness} onChange={(e) => setThickness(e.target.value)} placeholder={unit === "in" ? 'e.g. 1.375 (1-3/8")' : "e.g. 3.5"} />
      </label>
      <label>Gap above the closed door ({unit}) — leave blank if not measured yet
        <input inputMode="decimal" value={gap} onChange={(e) => setGap(e.target.value)} placeholder={unit === "in" ? "e.g. 0.25" : "e.g. 0.6"} />
      </label>
      <label>Hook type
        <select value={preset} onChange={(e) => setPreset(e.target.value)}>
          {HOOK_PRESETS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </label>
      {preset === "custom" && (
        <label>Hook opening (inches)
          <input inputMode="decimal" value={customOpening} onChange={(e) => setCustomOpening(e.target.value)} placeholder="e.g. 1.5" />
        </label>
      )}

      {result && (
        <div data-verdict={result.verdict}>
          <h3>{VERDICT_LABEL[result.verdict]}</h3>
          <ul>{result.reasons.map((r) => <li key={r}>{r}</li>)}</ul>
          <h4>Renter check</h4>
          <ul>{result.renterCheck.map((r) => <li key={r}>{r}</li>)}</ul>
          <p><small>This is a general fit check based on typical bracket dimensions. Bracket thickness and opening size vary by maker — verify the exact hook's specs on its listing before ordering.</small></p>
        </div>
      )}
    </section>
  );
}
