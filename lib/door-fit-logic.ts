// Over-Door Hook Fit Checker — core logic (no dependencies)
// Design: ~/workspace/smallfixfinds/product_spec_v2.md (Tool #2)
// An over-door hook fails in three honest ways:
//  - the bracket opening is smaller than the door slab (won't go on)
//  - the gap above the closed door is smaller than the bracket's flat bar (door won't close)
//  - the opening is far wider than the door (hook swings, rattles and can mark the door)
// Verdict rules (v1):
//  - Won't fit: door thickness > hook opening, OR top gap < bracket bar thickness (0.08")
//  - Tight: slack (opening - thickness) < 0.05" or > 0.5", OR top gap < 0.15"
//  - Fits: otherwise

export type Unit = "in" | "cm";
export type Verdict = "fits" | "tight" | "wont-fit";

export interface HookPreset {
  id: string;
  name: string;
  openingIn: number; // the door thickness the hook is made for
}

export const HOOK_PRESETS: HookPreset[] = [
  { id: "standard", name: 'Standard hook — made for 1-3/8" interior doors', openingIn: 1.5 },
  { id: "wide", name: 'Wide hook — made for 1-3/4" exterior doors', openingIn: 1.875 },
  { id: "custom", name: "I know my hook's opening size", openingIn: 0 },
];

export const BRACKET_BAR_IN = 0.08; // typical flat steel bracket thickness over the door top

export interface DoorFitInput {
  doorThickness: number; // in the chosen unit
  topGap: number; // gap between the top of the closed door and the frame, in the chosen unit; 0 = not measured
  unit: Unit;
  hookOpeningIn: number; // inches (from preset or custom entry)
}

export interface DoorFitResult {
  verdict: Verdict;
  slackIn: number;
  reasons: string[];
  renterCheck: string[];
}

const toInches = (v: number, unit: Unit) => (unit === "cm" ? v / 2.54 : v);
export const round2 = (v: number) => Math.round(v * 100) / 100;

const RENTER_CHECK = [
  "Add felt pads where the bracket touches the door — bare metal on paint is how deposit deductions start.",
  "Stay under the maker's weight limit; over-door hooks fail by bending, and a bent bracket scrapes the frame.",
  "Hooks come down in seconds at move-out — nothing here needs holes, filler or paint.",
];

export function checkOverDoorFit(input: DoorFitInput): DoorFitResult {
  const thicknessIn = toInches(input.doorThickness, input.unit);
  const gapIn = toInches(input.topGap, input.unit);
  const opening = input.hookOpeningIn;
  const reasons: string[] = [];

  if (!isFinite(thicknessIn) || thicknessIn <= 0 || !isFinite(opening) || opening <= 0) {
    return { verdict: "wont-fit", slackIn: 0, reasons: ["Enter your door thickness and the hook's opening size to get a verdict."], renterCheck: RENTER_CHECK };
  }

  const slack = opening - thicknessIn;

  if (slack < 0) {
    reasons.push(`Your door is ${round2(thicknessIn)}" thick and this hook opens ${round2(opening)}" — the bracket cannot go over the door.`);
    reasons.push(`Look for a hook made for doors at least ${round2(thicknessIn)}" thick (a "wide" or 1-3/4" model if your door is an exterior door).`);
    return { verdict: "wont-fit", slackIn: round2(slack), reasons, renterCheck: RENTER_CHECK };
  }

  if (input.topGap > 0 && gapIn < BRACKET_BAR_IN) {
    reasons.push(`The gap above your closed door (${round2(gapIn)}") is thinner than a typical bracket bar (${BRACKET_BAR_IN}") — the door will not close with the hook on.`);
    reasons.push("A thinner flat-bar bracket, or hanging the hook on a different door with more top clearance, is the usual way out.");
    return { verdict: "wont-fit", slackIn: round2(slack), reasons, renterCheck: RENTER_CHECK };
  }

  let tight = false;
  if (slack < 0.05) {
    tight = true;
    reasons.push(`The bracket is only ${round2(slack)}" wider than the door — it may need force to slide on and can scrape paint. Test it over a protected spot first.`);
  } else if (slack > 0.5) {
    tight = true;
    reasons.push(`${round2(slack)}" of play between bracket and door — the hook will swing and rattle, and the load will lean on the door face. Felt pads or a closer-size hook fix most of it.`);
  } else {
    reasons.push(`${round2(slack)}" of play between bracket and door — enough to slide on, not enough to swing.`);
  }

  if (input.topGap > 0) {
    if (gapIn < 0.15) {
      tight = true;
      reasons.push(`Top gap is ${round2(gapIn)}" — the bracket bar (${BRACKET_BAR_IN}") passes, but paint build-up or a slightly warped frame can still pinch. Close the door slowly the first time.`);
    } else {
      reasons.push(`Top gap of ${round2(gapIn)}" clears the bracket bar (${BRACKET_BAR_IN}") with room to spare.`);
    }
  } else {
    tight = true;
    reasons.push("Top gap not measured — it is the measurement that vetoes over-door hooks most often. Slip a coin stack or a folded card over the closed door's top edge to gauge it.");
  }

  return { verdict: tight ? "tight" : "fits", slackIn: round2(slack), reasons, renterCheck: RENTER_CHECK };
}
