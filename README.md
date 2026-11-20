# Small Fix Finds — Fit Tools (implementation in progress)

Status (2026-11-21): This repository was created empty and holds the
"Will It Fit?" tool implementation built and verified locally by Mugi,
plus a migration of the live site's existing pages (see below).

Migration (2026-11-21): the live site's 13 sitemap URLs were migrated into
this repository from the published pages — home, guides index + 3 guides
(full body text), collections index, finds index, item page, about,
privacy, and the 3 category hubs — plus the problem pages (5) and
collection detail pages (3) that the live pages link to (these were
noindex / absent from the live sitemap and stay out of this sitemap too).
The tool page and the item page now use the same Amazon affiliate URL as
the live item page, and the item page embeds the fit checker.
Styling is a plain scaffold (system font, simple cards) — the live site's
CSS/design was not reproduced. Server-side features of the live site
(the /go/offer redirect, visit measurement, owner Pinterest integration
described in the privacy policy) are NOT part of this codebase.

IMPORTANT: Do NOT connect this repository to the smallfixfinds.com domain
on Cloudflare Pages until the design parity and the server-side features
above have been decided — connecting it now would change the live site's
appearance and drop those features.

## Contents
- `app/tools/will-it-fit-over-sink-rack/` — Over-Sink Rack Fit Checker page
- `components/OverSinkFitChecker.tsx` — client component
- `lib/fit-logic.ts` — verdict logic (Fits / Tight / Won't fit), no dependencies

## Next steps
1. Decide design parity: restyle this scaffold to match the live site, or accept the plain layout.
2. Decide the server-side features (/go/offer redirect, visit measurement, owner Pinterest integration): reimplement, or drop them knowingly.
3. Only then connect Cloudflare Pages / the domain.
