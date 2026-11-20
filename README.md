# Small Fix Finds — Fit Tools (implementation in progress)

Status (2026-11-21): This repository was created empty and currently holds the
"Will It Fit?" tool implementation built and verified locally by Mugi
(Next.js production build passed, tool page served with HTTP 200).

IMPORTANT: This is NOT yet the source of the live smallfixfinds.com site.
The live site (13 URLs: 3 guides, 1 item, about, privacy, collections) is
served from elsewhere. Do NOT connect this repository to the
smallfixfinds.com domain on Cloudflare Pages until the existing pages have
been migrated into this repository — connecting it now would replace the
live content with this scaffold.

## Contents
- `app/tools/will-it-fit-over-sink-rack/` — Over-Sink Rack Fit Checker page
- `components/OverSinkFitChecker.tsx` — client component
- `lib/fit-logic.ts` — verdict logic (Fits / Tight / Won't fit), no dependencies

## Next steps
1. Migrate the existing live pages into this repo (home, guides, item, about, privacy, collections, sitemap).
2. Replace the placeholder Amazon URL in the tool page with the same affiliate link used on the live item page.
3. Only then connect Cloudflare Pages / the domain.
