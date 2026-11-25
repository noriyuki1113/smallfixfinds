// Tension Rod Fit Checker — core logic (no dependencies)
// Tool #6. A tension rod does not fail in the middle of its range; it fails
// at the ends and on bad walls. Model (v1):
//  - The opening width must sit inside the rod's stated range. Outside the
//    range there is no verdict to argue with.
//  - Within 1" of either end of the range is Tight: near full extension the
//    spring is weak and the rod sags or slips; near full compression it is
//    hard to seat and can bow.
//  - The walls decide the rest. Pipes or an obstruction at the mounting
//    height, or walls that are not flat and parallel, downgrade a clean pass
//    to Tight — the rod holds by friction, and friction needs two honest
//    surfaces.

export type Unit = "in" | "cm";
export type Verdict = "fits" | "tight" | "wont-fit";

export interface RodPreset {
  id: string;
  name: string;
  minIn: number;
  maxIn: number;
}

export const ROD_PRESETS: RodPreset[] = [
  { id: "s", name: 'Small rod — 15.7" to 23.6"', minIn: 15.7, maxIn: 23.6 },
  { id: "m", name: 'Medium rod — 23.6" to 35.4"', minIn: 23.6, maxIn: 35.4 },
  { id: "l", name: 'Long rod — 35.4" to 47.2"', minIn: 35.4, maxIn: 47.2 },
  { id: "xl", name: 'Extra-long rod — 47" to 59"', minIn: 47, maxIn: 59 },
  { id: "custom", name: "I know my rod's range", minIn: 0, maxIn: 0 },
];

export interface TensionRodInput {
  openingWidth: number; // between the two mounting surfaces, in the chosen unit
  rodMinIn: number; // inches (from preset or custom entry)
  rodMaxIn: number; // inches
  hasObstruction: boolean; // pipes / a fitting at the mounting height
  wallsFlatParallel: boolean; // user confirms both surfaces are flat and parallel
  unit: Unit;
}

export interface TensionRodResult {
  verdict: Verdict;
  marginToEndIn: number; // distance to the nearer end of the rod's range
  reasons: string[];
  renterCheck: string[];
}

const toInches = (v: number, unit: Unit) => (unit === "cm" ? v / 2.54 : v);
export const round1 = (v: number) => Math.round(v * 10) / 10;

const RENTER_CHECK = [
  "Tension rods are the renter's friend precisely because they leave nothing behind — but test the hold with a hand pull before trusting it with bottles over a sink.",
  "Rubber end caps on paint or tile can leave a ring over months; a small piece of clear tape or a felt pad under each cap prevents it.",
  "Load hangs from the middle and the rod bows there first — spread hangers toward the ends and stay under the maker's weight limit.",
];

export function checkTensionRodFit(input: TensionRodInput): TensionRodResult {
  const opening = toInches(input.openingWidth, input.unit);
  const { rodMinIn: min, rodMaxIn: max } = input;
  const reasons: string[] = [];

  if (!isFinite(opening) || opening <= 0 || !(min > 0) || !(max > min)) {
    return { verdict: "wont-fit", marginToEndIn: 0, reasons: ["Enter the opening width and the rod's stated range to get a verdict."], renterCheck: RENTER_CHECK };
  }

  const margin = Math.min(opening - min, max - opening);

  if (opening < min) {
    reasons.push(`The opening is ${round1(opening)}" and this rod starts at ${round1(min)}" — it cannot compress short enough to seat. Go one size down.`);
    return { verdict: "wont-fit", marginToEndIn: round1(margin), reasons, renterCheck: RENTER_CHECK };
  }
  if (opening > max) {
    reasons.push(`The opening is ${round1(opening)}" and this rod tops out at ${round1(max)}" — fully extended it still falls short. Go one size up, and check the middle of that range lands near your opening.`);
    return { verdict: "wont-fit", marginToEndIn: round1(margin), reasons, renterCheck: RENTER_CHECK };
  }

  let verdict: Verdict = "fits";
  if (margin < 1) {
    verdict = "tight";
    if (opening - min < max - opening) {
      reasons.push(`The opening sits ${round1(opening - min)}" from the rod's shortest setting. Seating a nearly fully-compressed rod takes force and it can bow — a size down, used mid-range, usually holds better.`);
    } else {
      reasons.push(`The opening sits ${round1(max - opening)}" from the rod's longest setting. Near full extension the spring is at its weakest — expect sag under load, and consider a size up used mid-range.`);
    }
  } else {
    reasons.push(`The opening (${round1(opening)}") sits comfortably inside the rod's range (${round1(min)}"–${round1(max)}"), with ${round1(margin)}" to spare from the nearer end — that is where a tension rod holds best.`);
  }

  if (input.hasObstruction) {
    verdict = "tight";
    reasons.push("There is an obstruction at mounting height (pipes or a fitting). The rod has to mount above, below or in front of it — re-measure the opening at that exact height, because cabinet and shower walls are rarely the same width at two heights.");
  }
  if (!input.wallsFlatParallel) {
    verdict = "tight";
    reasons.push("The walls are not confirmed flat and parallel. A tension rod holds by friction on two honest surfaces; on a curved or slanted wall it walks and slips. Wider end caps or adhesive mounting cups (removable, renter-safe) are the usual fix.");
  }

  return { verdict, marginToEndIn: round1(margin), reasons, renterCheck: RENTER_CHECK };
}
