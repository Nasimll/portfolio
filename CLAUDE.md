@AGENTS.md

# Portfolio — project instructions

Personal portfolio site: on-scroll, animated, hero-driven, focused on AI
engineering / product building / software engineering work.

## Stack

- **Next.js (App Router) + TypeScript** — `src/app`
- **Tailwind CSS v4** — tokens defined as CSS variables in `src/app/globals.css`
  (`:root` = day theme, `.dark` = night theme), consumed via `@theme inline`
- **next-themes** — light/dark ("day"/"night") toggle, class strategy on `<html>`
- **GSAP + ScrollTrigger** — all scroll-driven and pointer-driven animation.
  Registered once via `src/lib/gsap.ts` (`registerGsap()`), never import
  `gsap`/`ScrollTrigger` directly elsewhere.
- Hand-built components in the shadcn/ui style (Radix primitives + `cva` +
  `cn()` from `src/lib/utils.ts`) rather than the shadcn CLI — `ui.shadcn.com`
  and the custom `registry.watermelon.sh` registry are not reachable from
  this environment's network egress, so `npx shadcn add ...` will fail here.
  Recreate a given shadcn block by hand instead of trying to fetch it.
- Icons: `lucide-react`. Note: this version of lucide-react ships **no brand
  icons** (no `Github`, `Linkedin`, etc.) — use `src/components/icons.tsx`
  for those, add more there the same way if needed.

## Content model

All personal copy (name, role, location, about text, skills, experience,
education, projects, contact info) lives in **`src/data/profile.ts`**. Every
section component reads from it — updating that one file updates the whole
site. Placeholder values are marked `TODO`; replace them from the resume
before treating a section as done. Don't hardcode personal content directly
in components.

## Hero scene (`src/components/hero/`)

`mountain-scene.tsx` is a hand-drawn SVG mountain range (no external image
assets — kept dependency-free since arbitrary image hosts aren't reliably
reachable from this environment), with:

- 3 parallax layers (back/mid/front), each a nested `<g>` pair: **outer**
  group = scroll-driven vertical rise (GSAP `ScrollTrigger`, scrub), **inner**
  group = pointer-driven horizontal drift (`gsap.quickTo`). Keep that split —
  don't animate `x`/`y` on the same element from both drivers or they'll fight.
- Day/night is pure CSS custom properties (`--sky-*`, `--mtn-*`, `--sun-*`,
  `--star-opacity`, …) defined in `globals.css` under `:root` / `.dark` — the
  scene component itself has no theme branching logic.
- Star field positions use a seeded PRNG (`mulberry32`), not `Math.random()`
  directly — this is SSR'd, so non-deterministic values there cause a
  hydration mismatch. Any new random-looking decoration in this component
  needs the same treatment.
- A standing figure silhouette sits in the front layer; sun/moon and clouds
  are plain absolutely-positioned divs (not SVG) so they can move
  independently.
- `Reveal` (`src/components/reveal.tsx`) is the shared scroll-fade-in
  wrapper for everything below the hero — prefer it over ad hoc
  ScrollTrigger code in section components.

## `ui-ux-pro-max` skill

Installed under `.claude/skills/` (design, ui-styling, design-system, brand,
banner-design, slides + the core `ui-ux-pro-max` search data/scripts) via
the official CLI:

```
npx ui-ux-pro-max-cli@latest init --ai claude --offline --force
```

Re-run that (bump to `@latest`) to refresh it later. It's third-party
generated content — excluded from ESLint (`eslint.config.mjs`) and not
meant to be hand-edited.

## Conventions

- Path alias `@/*` → `src/*`.
- Keep animation setup inside `useEffect` + `gsap.context(...)`, and always
  `ctx.revert()` in the cleanup — this repo mixes many mounted/unmounted
  animated components and leaking triggers causes visible scroll jank.
- Run `npx tsc --noEmit` and `npx eslint .` before considering a change done.
- No image assets checked in yet. If real photos/screenshots are added,
  put them in `public/` and reference with `next/image`.

## Known gaps / next steps

- `src/data/profile.ts` is placeholder content — needs the real resume.
- No `public/resume.pdf` yet — `profile.resumeUrl` points at a file that
  doesn't exist until one is added.
- Social links (`profile.social`) are placeholders.
