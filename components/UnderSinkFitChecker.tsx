"use client";
// Under-Sink Organizer Fit Checker — client component.
// Route target: /tools/will-it-fit-under-sink-organizer/
// Logic lives in ../lib/under-sink-fit-logic.ts — keep verdict rules there only.
import { useMemo, useState } from "react";
import { checkUnderSinkFit, type Unit } from "../lib/under-sink-fit-logic";

const VERDICT_LABEL = { fits: "Fits", tight: "Tight — check first", "wont-fit": "Won't fit" } as const;

export default function UnderSinkFitChecker() {
  const [unit, setUnit] = useState<Unit>("in");
  const [cabW, setCabW] = useState("");
  const [cabD, setCabD] = useState("");
  const [cabH, setCabH] = useState("");
  const [pipe, setPipe] = useState("");
  const [trap, setTrap] = useState("");
  const [orgW, setOrgW] = useState("");
  const [orgD, setOrgD] = useState("");
  const [orgH, setOrgH] = useState("");

  const result = useMemo(() => {
    const nums = [cabW, cabD, cabH, pipe, orgW, orgD, orgH].map((v) => parseFloat(v));
    if (nums.some((n) => !n)) return null;
    return checkUnderSinkFit({
      cabinetWidth: nums[0], cabinetDepth: nums[1], cabinetHeight: nums[2],
      pipeZoneDepth: nums[3], trapClearance: parseFloat(trap) || 0,
      organizerWidth: nums[4], organizerDepth: nums[5], organizerHeight: nums[6],
      unit,
    });
  }, [cabW, cabD, cabH, pipe, trap, orgW, orgD, orgH, unit]);

  const ph = (inch: string, cm: string) => (unit === "in" ? inch : cm);

  return (
    <section aria-label="Under-sink organizer fit checker">
      <h2>Will an under-sink organizer fit around your pipes?</h2>
      <p>Measure the cabinet's inside, then measure how far the pipes reach into it. The space in front of the pipes is what you actually have.</p>

      <label>Unit
        <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
          <option value="in">inches</option>
          <option value="cm">cm</option>
        </select>
      </label>
      <h3>Your cabinet (inside measurements)</h3>
      <label>Interior width ({unit})
        <input inputMode="decimal" value={cabW} onChange={(e) => setCabW(e.target.value)} placeholder={ph("e.g. 30", "e.g. 76")} />
      </label>
      <label>Interior depth, back wall to door ({unit})
        <input inputMode="decimal" value={cabD} onChange={(e) => setCabD(e.target.value)} placeholder={ph("e.g. 22", "e.g. 56")} />
      </label>
      <label>Interior height ({unit})
        <input inputMode="decimal" value={cabH} onChange={(e) => setCabH(e.target.value)} placeholder={ph("e.g. 24", "e.g. 61")} />
      </label>
      <label>Pipe zone: back wall to the front of the pipes ({unit})
        <input inputMode="decimal" value={pipe} onChange={(e) => setPipe(e.target.value)} placeholder={ph("e.g. 10", "e.g. 25")} />
      </label>
      <label>Clearance under the trap: floor to the trap's underside ({unit}) — optional
        <input inputMode="decimal" value={trap} onChange={(e) => setTrap(e.target.value)} placeholder={ph("e.g. 12", "e.g. 30")} />
      </label>
      <h3>The organizer</h3>
      <label>Organizer width ({unit})
        <input inputMode="decimal" value={orgW} onChange={(e) => setOrgW(e.target.value)} placeholder={ph("e.g. 14", "e.g. 36")} />
      </label>
      <label>Organizer depth ({unit})
        <input inputMode="decimal" value={orgD} onChange={(e) => setOrgD(e.target.value)} placeholder={ph("e.g. 10", "e.g. 25")} />
      </label>
      <label>Organizer height ({unit})
        <input inputMode="decimal" value={orgH} onChange={(e) => setOrgH(e.target.value)} placeholder={ph("e.g. 12", "e.g. 30")} />
      </label>

      {result && (
        <div data-verdict={result.verdict}>
          <h3>{VERDICT_LABEL[result.verdict]}</h3>
          <ul>{result.reasons.map((r) => <li key={r}>{r}</li>)}</ul>
          <h4>Renter check</h4>
          <ul>{result.renterCheck.map((r) => <li key={r}>{r}</li>)}</ul>
          <p><small>This is a general fit check. Pipe layouts vary — if your pipes run to one side instead of the middle, measure the pipe zone on the side you plan to use. Verify the organizer's exact dimensions on its listing before ordering.</small></p>
        </div>
      )}
    </section>
  );
}
