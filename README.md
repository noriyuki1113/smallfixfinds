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
Design pass (2026-11-21): a light restyle in app/globals.css uses the live
site's own design tokens sampled from its stylesheet (blue #1769e0, ink
#10233f, coral #f35f3c, hairline #dce5ef, pale #f6f9fd, radius 18px) for the
header, cards, and the fit checker. It approximates the live look; it is not
a pixel-perfect reproduction.
Server-side features: /go/offer is restored as a static redirect page to the
Amazon listing. Visit measurement is to be replaced by Cloudflare Web
Analytics after the domain is connected (no token in code yet). The owner
Pinterest integration described in the privacy policy is NOT reimplemented —
it is owner-only; if the domain is connected without it, the privacy policy's
Pinterest section should be revised to match.

Preview: https://smallfixfinds-preview.pages.dev (Cloudflare Pages project
"smallfixfinds-preview", static export from this repo's main branch).
The live smallfixfinds.com still runs the previous site; connecting the
custom domain to this project is the remaining step, to be done only after
a final visual check of the preview.

## Contents
- `app/tools/will-it-fit-over-sink-rack/` — Over-Sink Rack Fit Checker page
- `components/OverSinkFitChecker.tsx` — client component
- `lib/fit-logic.ts` — verdict logic (Fits / Tight / Won't fit), no dependencies

## Next steps
1. Final visual check of the preview after the design pass.
2. Connect the custom domain smallfixfinds.com to the Pages project (owner action in Cloudflare dashboard).
3. After connection: enable Cloudflare Web Analytics, revise the privacy policy's Pinterest section, verify all routes on the live domain.

<!-- redeploy 2026-11-21: enable Web Analytics beacon injection -->
