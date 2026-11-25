// Fridge-Gap Slim Cart Fit Checker — core logic (no dependencies)
// Tool #5. The gap beside the fridge is measured at the front, at counter
// height, by people who then order a cart that meets the baseboard at the
// floor and the fridge handle at the front. Model (v1):
//  - Effective width = gap width - baseboard protrusion - handle protrusion.
//    The cart's width must fit the effective width, not the headline gap.
//  - Slack < 0.5" is Tight: casters wander, fridge doors vibrate, and a cart
//    that has to be forced in will be dragged out scratching the floor.
//  - Depth: a cart deeper than the gap sticks out past the fridge front.
//    That is Tight (trip and bump territory), not Won't fit.
//  - Ventilation veto: if the user says the gap is the fridge maker's
//    required air clearance, the verdict is Won't fit regardless of the
//    numbers — that space is already doing a job.

export type Unit = "in" | "cm";
export type Verdict = "fits" | "tight" | "wont-fit";

export interface FridgeGapInput {
  gapWidth: number;
  gapDepth: number;
  baseboardProtrusion: number; // 0 = none / not measured
  handleProtrusion: number; // how far the fridge handle reaches into the gap; 0 = none
  cartWidth: number;
  cartDepth: number;
  isVentilationClearance: boolean; // the gap is the maker's required air space
  unit: Unit;
}

export interface FridgeGapResult {
  verdict: Verdict;
  effectiveWidthIn: number;
  slackIn: number;
  reasons: string[];
  renterCheck: string[];
}

const toInches = (v: number, unit: Unit) => (unit === "cm" ? v / 2.54 : v);
export const round1 = (v: number) => Math.round(v * 10) / 10;

const RENTER_CHECK = [
  "Check the fridge manual's side clearance before filling any gap — some models need that air space to shed heat, and a blocked vent shortens the fridge's life, not just the cart's usefulness.",
  "Casters on a hard floor wander. A cart that fits with room to spare still wants a stop or a mat, so it does not drift into the walkway.",
  "Nothing here is fixed in place — the cart rolls out for cleaning and for move-out, which is exactly why it beats a built-in for renters.",
];

export function checkFridgeGapFit(input: FridgeGapInput): FridgeGapResult {
  const gapW = toInches(input.gapWidth, input.unit);
  const gapD = toInches(input.gapDepth, input.unit);
  const base = toInches(input.baseboardProtrusion, input.unit);
  const handle = toInches(input.handleProtrusion, input.unit);
  const cartW = toInches(input.cartWidth, input.unit);
  const cartD = toInches(input.cartDepth, input.unit);
  const reasons: string[] = [];
  const effective = gapW - base - handle;
  const slack = effective - cartW;
  const out = { effectiveWidthIn: round1(effective), slackIn: round1(slack) };

  if ([gapW, gapD, cartW, cartD].some((v) => !isFinite(v) || v <= 0)) {
    return { ...out, verdict: "wont-fit", reasons: ["Enter the gap and cart measurements to get a verdict."], renterCheck: RENTER_CHECK };
  }

  if (input.isVentilationClearance) {
    reasons.push("This gap is the fridge maker's required air clearance — it is already working as ventilation. Filling it with a cart traps heat against the fridge side, whatever the tape measure says.");
    reasons.push("Look at the other side of the fridge, or at a gap that is not in the manual's clearance diagram.");
    return { ...out, verdict: "wont-fit", reasons, renterCheck: RENTER_CHECK };
  }

  if (slack < 0) {
    reasons.push(`The gap measures ${round1(gapW)}", but the baseboard (${round1(base)}") and the handle (${round1(handle)}") leave ${round1(effective)}" of usable width — and the cart is ${round1(cartW)}" wide. It misses by ${round1(-slack)}".`);
    reasons.push(`Look for a cart no wider than ${round1(effective - 0.5)}" if you want it to roll in and out without a fight.`);
    return { ...out, verdict: "wont-fit", reasons, renterCheck: RENTER_CHECK };
  }

  let verdict: Verdict = "fits";
  if (slack < 0.5) {
    verdict = "tight";
    reasons.push(`It fits with ${round1(slack)}" to spare across the effective ${round1(effective)}" (gap ${round1(gapW)}" minus baseboard and handle). Casters never run perfectly straight, so expect to guide it in — and check the gap at the floor, not just at counter height.`);
  } else {
    reasons.push(`Effective width is ${round1(effective)}" (gap ${round1(gapW)}" minus ${round1(base)}" of baseboard and ${round1(handle)}" of handle); the ${round1(cartW)}" cart leaves ${round1(slack)}" to roll on.`);
  }

  if (cartD > gapD) {
    verdict = "tight";
    reasons.push(`The cart is ${round1(cartD)}" deep against a ${round1(gapD)}" gap, so it will stand ${round1(cartD - gapD)}" proud of the fridge front. Fine if that edge is not in a walkway or a door swing — measure both before you decide it is fine.`);
  } else {
    reasons.push(`Depth works too: ${round1(cartD)}" of cart in a ${round1(gapD)}" gap, so the front sits flush or recessed.`);
  }

  if (base === 0 && handle === 0) {
    reasons.push("Baseboard and handle were entered as zero — if either exists and was not measured, the effective width above is optimistic. The floor-level measurement is the one that vetoes carts.");
  }

  return { ...out, verdict, reasons, renterCheck: RENTER_CHECK };
}
