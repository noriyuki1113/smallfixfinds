"use client";
// Sofa-Through-Door Fit Checker — client component.
// Route target: /tools/will-it-fit-sofa-through-door/
// Logic lives in ../lib/sofa-fit-logic.ts — keep verdict rules there only.
import { useMemo, useState } from "react";
import { checkSofaFit, DOOR_PRESETS, type Unit } from "../lib/sofa-fit-logic";

const VERDICT_LABEL = { fits: "Fits", tight: "Tight — check first", "wont-fit": "Won't fit" } as const;

export default function SofaFitChecker() {
  const [unit, setUnit] = useState<Unit>("in");
  const [preset, setPreset] = useState("custom");
  const [doorW, setDoorW] = useState("");
  const [doorH, setDoorH] = useState("");
  const [sofaL, setSofaL] = useState("");
  const [sofaD, setSofaD] = useState("");
  const [sofaH, setSofaH] = useState("");
  const [leg, setLeg] = useState("");
  const [doorOff, setDoorOff] = useState(false);
  const [tightTurn, setTightTurn] = useState(false);
  const [hall, setHall] = useState("");

  const result = useMemo(() => {
    const nums = [doorW, doorH, sofaL, sofaD, sofaH].map((v) => parseFloat(v));
    if (nums.some((n) => !n)) return null;
    return checkSofaFit({
      doorWidth: nums[0], doorHeight: nums[1],
      sofaLength: nums[2], sofaDepth: nums[3], sofaHeight: nums[4],
      legHeight: parseFloat(leg) || 0,
      doorOff, hasTightTurn: tightTurn,
      hallwayWidth: parseFloat(hall) || 0,
      unit,
    });
  }, [doorW, doorH, sofaL, sofaD, sofaH, leg, doorOff, tightTurn, hall, unit]);

  const ph = (inch: string, cm: string) => (unit === "in" ? inch : cm);

  const pickPreset = (id: string) => {
    setPreset(id);
    const p = DOOR_PRESETS.find((d) => d.id === id);
    if (p && p.clearWidthIn > 0) {
      setDoorW(unit === "in" ? String(p.clearWidthIn) : String(Math.round(p.clearWidthIn * 2.54)));
    }
  };

  return (
    <section aria-label="Sofa through door fit checker">
      <h2>Will the sofa fit through your door?</h2>
      <p>Measure the door's clear opening — frame to frame with the door fully open, not the size on the slab — then the sofa's depth and back height. The smaller of those two is what has to get across the doorway.</p>

      <label>Unit
        <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
          <option value="in">inches</option>
          <option value="cm">cm</option>
        </select>
      </label>

      <h3>Your doorway (clear opening)</h3>
      <label>Door size preset
        <select value={preset} onChange={(e) => pickPreset(e.target.value)}>
          {DOOR_PRESETS.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </label>
      <label>Clear width ({unit})
        <input inputMode="decimal" value={doorW} onChange={(e) => { setDoorW(e.target.value); setPreset("custom"); }} placeholder={ph("e.g. 33.5", "e.g. 85")} />
      </label>
      <label>Clear height ({unit})
        <input inputMode="decimal" value={doorH} onChange={(e) => setDoorH(e.target.value)} placeholder={ph("e.g. 80", "e.g. 203")} />
      </label>
      <label>
        <input type="checkbox" checked={doorOff} onChange={(e) => setDoorOff(e.target.checked)} />
        I can take the door off its hinges (adds about 1.5" of clear width)
      </label>

      <h3>The sofa</h3>
      <label>Length, arm to arm ({unit})
        <input inputMode="decimal" value={sofaL} onChange={(e) => setSofaL(e.target.value)} placeholder={ph("e.g. 84", "e.g. 213")} />
      </label>
      <label>Depth, back to front ({unit})
        <input inputMode="decimal" value={sofaD} onChange={(e) => setSofaD(e.target.value)} placeholder={ph("e.g. 38", "e.g. 97")} />
      </label>
      <label>Height, floor to the top of the back ({unit})
        <input inputMode="decimal" value={sofaH} onChange={(e) => setSofaH(e.target.value)} placeholder={ph("e.g. 35", "e.g. 89")} />
      </label>
      <label>Leg height, if the legs unscrew ({unit}) — optional
        <input inputMode="decimal" value={leg} onChange={(e) => setLeg(e.target.value)} placeholder={ph("e.g. 2", "e.g. 5")} />
      </label>

      <h3>The route in</h3>
      <label>
        <input type="checkbox" checked={tightTurn} onChange={(e) => setTightTurn(e.target.checked)} />
        There is a tight 90-degree turn right before or after the door
      </label>
      {tightTurn && (
        <label>Hallway width ({unit}) — optional
          <input inputMode="decimal" value={hall} onChange={(e) => setHall(e.target.value)} placeholder={ph("e.g. 36", "e.g. 91")} />
        </label>
      )}

      {result && (
        <div data-verdict={result.verdict}>
          <h3>{VERDICT_LABEL[result.verdict]}</h3>
          <ul>{result.reasons.map((r) => <li key={r}>{r}</li>)}</ul>
          <p><small>Diagonal depth: {result.diagonalDepthIn}" · Effective height used: {result.effectiveHeightIn}"</small></p>
          <h4>Renter check</h4>
          <ul>{result.renterCheck.map((r) => <li key={r}>{r}</li>)}</ul>
          <p><small>This is a general fit check based on the doorway itself. Cushions compress, listings round their numbers, and hallways, stairs and elevators can veto a sofa the door allows — verify the sofa's exact dimensions on its listing and measure every point on the route, not just the front door.</small></p>
        </div>
      )}
    </section>
  );
}
