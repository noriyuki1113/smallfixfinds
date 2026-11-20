// Content migrated from the live smallfixfinds.com (2026-11-21).
// Copy is the site's own published text, transcribed from the live pages.

export const AMAZON_URL = "https://www.amazon.com/dp/B07F85GVWS?tag=smallfixfinds-20";

export interface GuideSummary {
  slug: string;
  category: string;
  categorySlug: string;
  title: string;
  updated: string;
  blurb: string;
  intro: string;
}

export const GUIDES: GuideSummary[] = [
  {
    slug: "small-kitchen-fixes-save-counter-space",
    category: "Small Kitchen",
    categorySlug: "small-kitchen",
    title: "7 Small Kitchen Fixes That Save Counter Space",
    updated: "2026-10-25",
    blurb: "A busy counter rarely needs another organizer by default. Start with the task that takes over the surface, then choose a small change that makes it easier.",
    intro: "Seven practical ways to reclaim working room in a compact kitchen, with the measurements and tradeoffs to check before you change your setup.",
  },
  {
    slug: "renter-friendly-storage-no-drilling",
    category: "Apartment Storage",
    categorySlug: "apartment-storage",
    title: "Renter-Friendly Storage Ideas That Need No Drilling",
    updated: "2026-10-05",
    blurb: "No-drill storage can be useful in rentals, but the right fit depends on door clearance, shelf dimensions and surface condition.",
    intro: "Make better use of doors, shelves and underused corners with storage ideas that do not start with a drill.",
  },
  {
    slug: "cable-management-small-desks",
    category: "Desk & Workspace",
    categorySlug: "desk-workspace",
    title: "Simple Cable Management Ideas for Small Desks",
    updated: "2026-10-05",
    blurb: "Cable clutter often starts with one cable slipping out of reach. A small anchor point and a clear route can solve more than a large organizer.",
    intro: "A few low-fuss ways to keep charging cables reachable and a small desk easier to reset.",
  },
];

export interface Category {
  slug: string;
  name: string;
  description: string;
  problemSlug: string;
  problemTitle: string;
  problemDescription: string;
  guideSlug: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "small-kitchen",
    name: "Small Kitchen",
    description: "Ideas, guides and useful little finds for kitchens where every inch of counter space matters.",
    problemSlug: "not-enough-counter-space",
    problemTitle: "Not enough counter space",
    problemDescription: "Make a little more room for food prep and the everyday tasks that keep taking over the counter.",
    guideSlug: "small-kitchen-fixes-save-counter-space",
  },
  {
    slug: "apartment-storage",
    name: "Apartment Storage",
    description: "Make awkward corners, doors and shelves work a little harder in a compact home.",
    problemSlug: "renter-friendly-storage",
    problemTitle: "Renter-friendly storage",
    problemDescription: "Use existing doors, shelves and movable organizers while respecting the rental home's surfaces.",
    guideSlug: "renter-friendly-storage-no-drilling",
  },
  {
    slug: "desk-workspace",
    name: "Desk & Workspace",
    description: "Small, practical ideas for calmer desks, easier charging and better use of limited work space.",
    problemSlug: "messy-cables",
    problemTitle: "Cables that keep falling or tangling",
    problemDescription: "Keep charging and computer cables close to where they are used.",
    guideSlug: "cable-management-small-desks",
  },
];

export interface Problem {
  slug: string;
  title: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  guideOrder: string[]; // guide slugs, in live display order
  hasItem: boolean;
}

export const PROBLEMS: Problem[] = [
  { slug: "not-enough-counter-space", title: "Not enough counter space", description: "Make a little more room for food prep and the everyday tasks that keep taking over the counter.", categorySlug: "small-kitchen", categoryName: "Small Kitchen", guideOrder: ["small-kitchen-fixes-save-counter-space", "renter-friendly-storage-no-drilling", "cable-management-small-desks"], hasItem: true },
  { slug: "sink-area-clutter", title: "Clutter around the sink", description: "Give wet tools and rinsing tasks a smaller, more predictable footprint.", categorySlug: "small-kitchen", categoryName: "Small Kitchen", guideOrder: ["small-kitchen-fixes-save-counter-space", "renter-friendly-storage-no-drilling", "cable-management-small-desks"], hasItem: true },
  { slug: "unused-vertical-space", title: "Unused vertical space", description: "Make a door, shelf or wall-height gap useful without adding bulky floor storage.", categorySlug: "apartment-storage", categoryName: "Apartment Storage", guideOrder: ["renter-friendly-storage-no-drilling", "small-kitchen-fixes-save-counter-space", "cable-management-small-desks"], hasItem: true },
  { slug: "messy-cables", title: "Cables that keep falling or tangling", description: "Keep charging and computer cables close to where they are used.", categorySlug: "desk-workspace", categoryName: "Desk & Workspace", guideOrder: ["cable-management-small-desks", "renter-friendly-storage-no-drilling", "small-kitchen-fixes-save-counter-space"], hasItem: false },
  { slug: "renter-friendly-storage", title: "Renter-friendly storage", description: "Use existing doors, shelves and movable organizers while respecting the rental home's surfaces.", categorySlug: "apartment-storage", categoryName: "Apartment Storage", guideOrder: ["renter-friendly-storage-no-drilling", "small-kitchen-fixes-save-counter-space", "cable-management-small-desks"], hasItem: false },
];

export interface Collection {
  slug: string;
  name: string;
  kind: string;
  intro: string;
  whoFor: string;
  why: string;
  guideSlug: string;
  hasItem: boolean;
  beforeChoose?: string[];
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "renter-friendly-fixes",
    name: "Renter-Friendly Fixes",
    kind: "Topic collection",
    intro: "Small-space ideas that make better use of what you already have. These picks use doors, shelves or temporary surfaces. Check the mounting method, clearances and any load limits before deciding whether one suits your space.",
    whoFor: "Use existing doors, shelves and movable organizers while respecting the rental home's surfaces.",
    why: "These picks use doors, shelves or temporary surfaces. Check the mounting method, clearances and any load limits before deciding whether one suits your space. A product is worth considering only when its dimensions, setup and everyday tradeoffs suit the way you use your space.",
    guideSlug: "renter-friendly-storage-no-drilling",
    hasItem: false,
  },
  {
    slug: "no-drill-fixes",
    name: "No-Drill Fixes",
    kind: "Topic collection",
    intro: "Ideas that can make a small home work harder without starting with a hole in the wall. No-drill products still depend on the right surface, door or shelf. Confirm compatibility and removal instructions before using a mounting product.",
    whoFor: "Explore removable or freestanding storage ideas and check the surface, clearance and load limits first.",
    why: "No-drill products still depend on the right surface, door or shelf. Confirm compatibility and removal instructions before using a mounting product. A product is worth considering only when its dimensions, setup and everyday tradeoffs suit the way you use your space.",
    guideSlug: "renter-friendly-storage-no-drilling",
    hasItem: false,
  },
  {
    slug: "space-saving-finds",
    name: "Space-Saving Finds",
    kind: "Curated collection",
    intro: "Useful little ideas for using the space you already have more thoughtfully. Space-saving ideas work best when they replace clutter or improve access. Consider the storage footprint and what needs to stay easy to reach.",
    whoFor: "Make a door, shelf or wall-height gap useful without adding bulky floor storage.",
    why: "Space-saving ideas work best when they replace clutter or improve access. Consider the storage footprint and what needs to stay easy to reach. A product is worth considering only when its dimensions, setup and everyday tradeoffs suit the way you use your space.",
    guideSlug: "small-kitchen-fixes-save-counter-space",
    hasItem: true,
    beforeChoose: ["usable sink opening", "faucet and cabinet clearance"],
  },
];

export const ITEM = {
  slug: "roll-up-drying-mat",
  name: 'Tomorotec 17.7" × 15.5" Roll-Up Dish Drying Rack',
  category: "Small-space kitchen",
  updated: "2026-10-25",
  summary: "A roll-up over-sink rack made from 304 stainless steel with silicone-coated ends, listed at 17.7 by 15.5 inches.",
  why: "Creates temporary drying or prep space, then rolls up when the sink or counter needs to be clear.",
  goodFor: "Compact kitchens with a sink opening narrower than the listed rack dimensions.",
  notFor: "Sink openings wider than the rack or anyone who needs a freestanding dish rack.",
  usefulWhen: "Drying a few dishes, rinsing produce, or resting lightweight kitchen items above the basin.",
  measureFirst: "Measure the sink opening—not only the outer rim—and confirm the selected size and color on Amazon before ordering.",
  solves: "not enough counter space",
  solvesSlug: "not-enough-counter-space",
  bestFor: "compact kitchens",
  setup: "over sink · renter-friendly",
  measure: "usable sink opening",
  problemSlugs: ["not-enough-counter-space", "sink-area-clutter", "unused-vertical-space"],
};

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
