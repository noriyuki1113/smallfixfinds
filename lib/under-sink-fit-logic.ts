// Under-Sink Organizer Fit Checker — core logic (no dependencies)
// Design: ~/workspace/smallfixfinds/product_spec_v2.md (Tool #3)
// The cabinet's outside dimensions lie. The pipes decide the usable space.
// Model (v1): the pipe assembly (drain + trap + supply lines) occupies a zone
// measured from the back wall forward ("pipe zone depth"). An organizer fits if:
//  - Path A (in front of the pipes): its depth fits the front zone AND its
//    width/height fit the cabinet, OR
//  - Path B (under the trap): its height clears the underside of the trap AND
//    its depth/width fit the cabinet.
// Verdict rules:
//  - Won't fit: neither path works.
//  - Tight: the working path leaves < 0.5" on its deciding dimension, or
//    Path B leaves < 1" of height clearance under the trap.
//  - Fits: otherwise.

export type Unit = "in" | "cm";
export type Verdict = "fits" | "tight" | "wont-fit";

export interface UnderSinkInput {
  cabinetWidth: number;
  cabinetDepth: number;
  cabinetHeight: number;
  pipeZoneDepth: number; // back wall to the front of the pipe assembly
  trapClearance: number; // cabinet floor to the underside of the trap; 0 = not measured
  organizerWidth: number;
  organizerDepth: number;
  organizerHeight: number;
  unit: Unit;
}

export interface UnderSinkResult {
  verdict: Verdict;
  frontZoneDepthIn: number;
  path: "front" | "under-trap" | null;
  reasons: string[];
  renterCheck: string[];
}

const toInches = (v: number, unit: Unit) => (unit === "cm" ? v / 2.54 : v);
export const round1 = (v: number) => Math.round(v * 10) / 10;

const RENTER_CHECK = [
  "Nothing under a sink should be fixed in place — a freestanding organizer lifts out for the plumber and for move-out.",
  "Keep anything absorbent (paper, cardboard) off the cabinet floor; a slow drip ruins stock before it ruins cabinets.",
  "Leave the shutoff valves reachable. An organizer that blocks a valve turns a small leak into water damage.",
];

export function checkUnderSinkFit(input: UnderSinkInput): UnderSinkResult {
  const W = toInches(input.cabinetWidth, input.unit);
  const D = toInches(input.cabinetDepth, input.unit);
  const H = toInches(input.cabinetHeight, input.unit);
  const pipe = toInches(input.pipeZoneDepth, input.unit);
  const trap = toInches(input.trapClearance, input.unit);
  const ow = toInches(input.organizerWidth, input.unit);
  const od = toInches(input.organizerDepth, input.unit);
  const oh = toInches(input.organizerHeight, input.unit);
  const reasons: string[] = [];

  if ([W, D, H, ow, od, oh].some((v) => !isFinite(v) || v <= 0)) {
    return { verdict: "wont-fit", frontZoneDepthIn: 0, path: null, reasons: ["Enter the cabinet and organizer measurements to get a verdict."], renterCheck: RENTER_CHECK };
  }

  const frontZone = D - pipe;

  if (ow > W) {
    reasons.push(`The organizer (${round1(ow)}" wide) is wider than the cabinet interior (${round1(W)}"). Measure inside width between the walls, not the door opening.`);
    return { verdict: "wont-fit", frontZoneDepthIn: round1(frontZone), path: null, reasons, renterCheck: RENTER_CHECK };
  }
  if (oh > H) {
    reasons.push(`The organizer (${round1(oh)}" tall) is taller than the cabinet interior (${round1(H)}").`);
    return { verdict: "wont-fit", frontZoneDepthIn: round1(frontZone), path: null, reasons, renterCheck: RENTER_CHECK };
  }

  // Path A: in front of the pipes
  const frontSlack = frontZone - od;
  if (frontSlack >= 0) {
    if (frontSlack < 0.5) {
      reasons.push(`It fits in front of the pipes with only ${round1(frontSlack)}" to spare — hoses and the door swing eat space, so treat this as a squeeze.`);
      return { verdict: "tight", frontZoneDepthIn: round1(frontZone), path: "front", reasons, renterCheck: RENTER_CHECK };
    }
    reasons.push(`In front of the pipes you have ${round1(frontZone)}" of depth; the organizer needs ${round1(od)}", leaving ${round1(frontSlack)}" spare.`);
    reasons.push("The trap stays untouched behind it — the cleanest under-sink layout.");
    return { verdict: "fits", frontZoneDepthIn: round1(frontZone), path: "front", reasons, renterCheck: RENTER_CHECK };
  }

  // Path B: slide under the trap
  if (trap > 0 && oh < trap && od <= D) {
    const clearance = trap - oh;
    if (clearance < 1) {
      reasons.push(`It only works slid under the trap, with ${round1(clearance)}" between the organizer top and the trap underside. One stored bottle taller than planned and it no longer slides.`);
      return { verdict: "tight", frontZoneDepthIn: round1(frontZone), path: "under-trap", reasons, renterCheck: RENTER_CHECK };
    }
    reasons.push(`Too deep for the front zone (${round1(frontZone)}"), but it slides under the trap with ${round1(clearance)}" of height clearance.`);
    reasons.push("Keep the trap itself reachable — you will want to unscrew it the first time a ring goes down the drain.");
    return { verdict: "fits", frontZoneDepthIn: round1(frontZone), path: "under-trap", reasons, renterCheck: RENTER_CHECK };
  }

  if (trap > 0) {
    reasons.push(`Too deep for the space in front of the pipes (${round1(frontZone)}" usable of ${round1(D)}"), and at ${round1(oh)}" tall it cannot slide under the trap (${round1(trap)}" of clearance).`);
  } else {
    reasons.push(`Too deep for the space in front of the pipes (${round1(frontZone)}" usable of ${round1(D)}"). It might slide under the trap — measure the floor-to-trap clearance to check that path.`);
  }
  reasons.push(`Look for an organizer no deeper than ${round1(frontZone)}", or a narrower one that sits beside the pipe run.`);
  return { verdict: "wont-fit", frontZoneDepthIn: round1(frontZone), path: null, reasons, renterCheck: RENTER_CHECK };
}
