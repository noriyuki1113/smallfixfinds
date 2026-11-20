// Over-Sink Rack Fit Checker — core logic (no dependencies)
// Design: ~/workspace/smallfixfinds_cb_blueprint.md
// Verdict rules (v1):
//  - Won't fit: rack length <= sink span (ends cannot rest on both sides)
//  - Tight: total overlap < 1.0" OR faucet/edges are tight/unsure
//  - Fits: total overlap >= 1.0" AND faucet clear AND edges flat

export type Unit = "in" | "cm";
export type Faucet = "clear" | "tight" | "unsure";
export type Edges = "flat" | "rounded" | "unsure";
export type Verdict = "fits" | "tight" | "wont-fit";

export interface FitInput {
  sinkSpan: number; // in the chosen unit
  sinkDepth: number; // front-to-back, in the chosen unit
  unit: Unit;
  faucet: Faucet;
  edges: Edges;
  rackLength?: number; // inches, defaults to the listed product
  rackDepth?: number; // inches
}

export interface FitResult {
  verdict: Verdict;
  overlapPerSideIn: number;
  recommendedMinRackLengthIn: number;
  reasons: string[];
}

export const DEFAULT_RACK = { lengthIn: 17.7, depthIn: 15.5, name: 'Tomorotec 17.7" × 15.5" Roll-Up Dish Drying Rack' };

const toInches = (v: number, unit: Unit) => (unit === "cm" ? v / 2.54 : v);
export const round1 = (v: number) => Math.round(v * 10) / 10;

export function checkOverSinkFit(input: FitInput): FitResult {
  const rackLength = input.rackLength ?? DEFAULT_RACK.lengthIn;
  const spanIn = toInches(input.sinkSpan, input.unit);
  const depthIn = toInches(input.sinkDepth, input.unit);
  const reasons: string[] = [];

  const overlapTotal = rackLength - spanIn;
  const overlapPerSide = overlapTotal / 2;
  const recommendedMin = spanIn + 1.5;

  if (!isFinite(spanIn) || spanIn <= 0) {
    return { verdict: "wont-fit", overlapPerSideIn: 0, recommendedMinRackLengthIn: 0, reasons: ["Enter your sink opening span to get a verdict."] };
  }

  if (overlapTotal <= 0) {
    reasons.push(`The rack (${rackLength}") is not longer than your sink opening (${round1(spanIn)}"), so both ends cannot rest on the counter.`);
    reasons.push(`Look for a rack at least ${round1(recommendedMin)}" long, or a freestanding style instead.`);
    return { verdict: "wont-fit", overlapPerSideIn: round1(overlapPerSide), recommendedMinRackLengthIn: round1(recommendedMin), reasons };
  }

  let tight = false;
  if (overlapTotal < 1.0) {
    tight = true;
    reasons.push(`Only ${round1(overlapPerSide)}" of rest per side — under the 0.5" per side we want for a stable rest.`);
  } else {
    reasons.push(`${round1(overlapPerSide)}" of rest per side, which clears the 0.5" minimum.`);
  }
  if (depthIn > 0 && (input.rackDepth ?? DEFAULT_RACK.depthIn) > depthIn + 2) {
    tight = true;
    reasons.push("The rack is much deeper than your sink front-to-back, so it will overhang the front edge noticeably.");
  }
  if (input.faucet !== "clear") {
    tight = true;
    reasons.push("Faucet clearance is tight or unchecked — measure from the faucet base to the far edge before ordering.");
  }
  if (input.edges !== "flat") {
    tight = true;
    reasons.push("Resting edges are rounded, raised, or unchecked — the rack ends need a flat, stable contact point on each side.");
  }

  if (tight) {
    reasons.push(`A safer minimum rack length for your sink is ${round1(recommendedMin)}".`);
    return { verdict: "tight", overlapPerSideIn: round1(overlapPerSide), recommendedMinRackLengthIn: round1(recommendedMin), reasons };
  }
  return { verdict: "fits", overlapPerSideIn: round1(overlapPerSide), recommendedMinRackLengthIn: round1(recommendedMin), reasons };
}
