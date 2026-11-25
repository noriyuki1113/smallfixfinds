// Sofa-Through-Door Fit Checker — core logic (no dependencies)
// Design: ~/workspace/smallfixfinds/product_spec_v2.md (Tool #4)
// Model (v1, the retailer / mover rule — stated openly, not dressed up as 3D
// geometry):
//  - Going through a doorway, the sofa is presented with one cross-section
//    side across the door's width: its depth, or its height if it is tipped
//    onto its back. So the SMALLER of (depth, effective height) must fit the
//    clear door width, and the larger must fit the clear door height.
//  - Effective height subtracts removable legs.
//  - Diagonal depth = sqrt(depth^2 + height^2). If that exceeds the door
//    height, the tilt-back maneuver has no room to work, so a pass that
//    depends on tipping is downgraded — there is no fallback angle.
//  - Standing the sofa on end does not help at the door itself (it presents
//    the depth across the width, which is never smaller than the side above),
//    but it is the standard rescue for the turn after the door — which is why
//    it appears in the turn advisory, not as a door verdict.
//  - A tight 90-degree turn after the door is the moving-sofa problem; v1
//    does not pretend to solve it. It downgrades to Tight and reports the
//    pivot numbers (sofa length vs hallway width + door width).
//  - Door sizes are nominal; the clear opening is about 2.5" narrower once
//    the frame, stops and the open slab are counted. Presets apply that
//    correction; a hand-measured clear opening should be entered as-is.
//  - Taking the door off its hinges gains about 1.5" of clear width.

export type Unit = "in" | "cm";
export type Verdict = "fits" | "tight" | "wont-fit";

export interface DoorPreset {
  id: string;
  name: string;
  clearWidthIn: number; // effective clear opening, nominal minus ~2.5"
}

export const DOOR_PRESETS: DoorPreset[] = [
  { id: "28", name: '28" nominal door — about 25.5" clear', clearWidthIn: 25.5 },
  { id: "30", name: '30" nominal door — about 27.5" clear', clearWidthIn: 27.5 },
  { id: "32", name: '32" nominal door — about 29.5" clear', clearWidthIn: 29.5 },
  { id: "36", name: '36" nominal door — about 33.5" clear', clearWidthIn: 33.5 },
  { id: "custom", name: "I measured the clear opening myself", clearWidthIn: 0 },
];

export const DOOR_OFF_GAIN_IN = 1.5;

export interface SofaFitInput {
  doorWidth: number; // clear opening, in the chosen unit
  doorHeight: number; // clear opening, in the chosen unit
  sofaLength: number;
  sofaDepth: number;
  sofaHeight: number;
  legHeight: number; // removable-leg height; 0 = legs stay on / not entered
  doorOff: boolean; // door taken off its hinges
  hasTightTurn: boolean; // a 90-degree turn right before/after the door
  hallwayWidth: number; // 0 = not measured
  unit: Unit;
}

export interface SofaFitResult {
  verdict: Verdict;
  diagonalDepthIn: number;
  effectiveHeightIn: number;
  slackIn: number; // clear width minus the side presented across it
  method: "straight" | null;
  reasons: string[];
  renterCheck: string[];
}

const toInches = (v: number, unit: Unit) => (unit === "cm" ? v / 2.54 : v);
export const round1 = (v: number) => Math.round(v * 10) / 10;

const RENTER_CHECK = [
  "Check your lease before taking a door off its hinges — most allow it if the door and hardware go back unmarked, but ask first if you are unsure.",
  "Put moving blankets or cardboard on the door frame edges; a scraped frame is the classic deposit deduction on sofa day.",
  "If the legs unscrew, bag and tape them (and the bolts) to the sofa base — a legless sofa in the new room and legs in a lost box helps nobody.",
];

export function checkSofaFit(input: SofaFitInput): SofaFitResult {
  const doorW0 = toInches(input.doorWidth, input.unit);
  const doorW = doorW0 + (input.doorOff ? DOOR_OFF_GAIN_IN : 0);
  const doorH = toInches(input.doorHeight, input.unit);
  const L = toInches(input.sofaLength, input.unit);
  const D = toInches(input.sofaDepth, input.unit);
  const leg = toInches(input.legHeight, input.unit);
  const H = toInches(input.sofaHeight, input.unit) - leg;
  const hall = toInches(input.hallwayWidth, input.unit);
  const reasons: string[] = [];
  const diagonal = Math.hypot(D, H);
  const base = { diagonalDepthIn: round1(diagonal), effectiveHeightIn: round1(H) };

  if ([doorW0, doorH, L, D, H].some((v) => !isFinite(v) || v <= 0)) {
    return {
      ...base, verdict: "wont-fit", slackIn: 0, method: null,
      reasons: ["Enter the clear door opening and the sofa's length, depth and height to get a verdict."],
      renterCheck: RENTER_CHECK,
    };
  }

  const across = Math.min(D, H); // side presented across the door width
  const upright = Math.max(D, H); // side presented against the door height
  const slack = doorW - across;

  // Main path: depth-first or tipped onto its back.
  if (across <= doorW && upright <= doorH) {
    let verdict: Verdict = "fits";
    if (slack < 2) {
      verdict = "tight";
      reasons.push(`It fits — on paper. The sofa presents ${round1(across)}" across a ${round1(doorW)}" clear opening, leaving ${round1(slack)}". Cushions, door stops and a moving blanket all eat into that, so expect a squeeze and guide both corners.`);
    } else {
      reasons.push(`The sofa presents ${round1(across)}" across the ${round1(doorW)}" clear opening (${round1(slack)}" to spare), and its ${round1(upright)}" other side is well under the ${round1(doorH)}" door height.`);
    }
    if (H < D) reasons.push(`That uses the tipped orientation: height (${round1(H)}") across the door, depth (${round1(D)}") vertical. The back cushions usually need to come off first.`);
    if (diagonal > doorH) {
      verdict = "tight";
      reasons.push(`Its diagonal depth is ${round1(diagonal)}" — more than the ${round1(doorH)}" door height — so there is no tilt-back fallback if the straight pass jams. It has to go through in the orientation above, first try.`);
    }
    if (leg > 0) reasons.push(`That verdict counts the legs removed (${round1(H)}" effective height instead of ${round1(H + leg)}"). They have to come off before the door, not at it.`);
    if (input.doorOff) reasons.push(`That verdict counts the door off its hinges (+${DOOR_OFF_GAIN_IN}" of clear width).`);

    if (input.hasTightTurn) {
      verdict = "tight";
      if (hall > 0) {
        reasons.push(`Then there is the 90-degree turn: the sofa is ${round1(L)}" long against a ${round1(hall)}" hallway. The doorway passes, but the pivot is the real test — hallway plus door width gives about ${round1(hall + doorW)}" of swing room.`);
        if (L > hall + doorW) reasons.push("The length is beyond that swing room, so plan on standing the sofa on end at the corner (which needs ceiling height at least its length) or on a different route in — a patio or balcony door, or a wider entry.");
      } else {
        reasons.push("There is a 90-degree turn and the hallway width is not measured — that pivot, not the door, is where long sofas fail. Measure the hallway and the ceiling height at the corner before delivery day.");
      }
    }
    return { ...base, verdict, slackIn: round1(slack), method: "straight", reasons, renterCheck: RENTER_CHECK };
  }

  // Won't fit: say which gate failed and what would change it.
  if (across > doorW) {
    reasons.push(`The sofa's smaller cross-section side is ${round1(across)}" (depth ${round1(D)}", height ${round1(H)}") and the clear doorway is ${round1(doorW)}" — it misses by ${round1(across - doorW)}", in every orientation.`);
    if (leg <= 0) reasons.push("If the legs unscrew, re-check with the leg height entered — dropping the height is the most common way a no becomes a yes.");
    if (!input.doorOff) reasons.push(`Taking the door off its hinges gains about ${DOOR_OFF_GAIN_IN}" — not enough alone here, but it stacks with the legs.`);
  } else {
    reasons.push(`The width passes, but the sofa's ${round1(upright)}" side is taller than the ${round1(doorH)}" clear door height, and its diagonal depth is ${round1(diagonal)}", so it cannot be tilted down to fit either.`);
  }
  reasons.push("The honest options are a sofa with a lower back or shallower depth, one that ships in sections, or a different way in (patio door, window, larger entry).");
  return { ...base, verdict: "wont-fit", slackIn: round1(slack), method: null, reasons, renterCheck: RENTER_CHECK };
}
