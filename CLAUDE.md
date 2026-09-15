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

## Design taste skills

`leonxlnx/taste-skill` is installed via `npx skills add
https://github.com/Leonxlnx/taste-skill` — writes to `.agents/skills/*`
with `.claude/skills/*` as symlinks (also third-party, excluded from
ESLint the same way as `ui-ux-pro-max`). Most relevant here:
`design-taste-frontend` (anti-generic-AI-UI, the main one), `gpt-taste`
(GSAP-heavy motion), `high-end-visual-design`, `redesign-existing-projects`
(explicitly for upgrading an existing site — use this one when iterating
on the current design rather than starting over), plus style-specific
ones (`minimalist-ui`, `industrial-brutalist-ui`, `brandkit`, …). Re-run
the same `npx skills add` command to update.

`.claude/references/awesome-design-md/` is a reference-only clone of
`VoltAgent/awesome-design-md` (not a skill, no SKILL.md) — one
`DESIGN.md` per real brand (Nike, Stripe, Apple, Notion, …) documenting
their actual palette/type/layout/motion system. Useful to read a couple
of adjacent ones for inspiration before a design pass; nothing here reads
them automatically.

`pbakaus/impeccable` is installed at `.claude/skills/impeccable/` (copied
directly from the repo's own `.claude/skills/impeccable/` distribution —
its own `npx impeccable install` CLI 403s in this sandbox trying to fetch
a signed bundle, so don't re-run that here). Commands: `critique`,
`audit`, `polish`, `bolder`, `quieter`, `animate`, etc. — see its
`SKILL.md` for the full table. Two things matter every time it's used:

- **`reference/craft-floor.md` is mandatory reading before any UI edit**
  (not just when using this skill explicitly) — it has hard bans, not
  preferences: no eyebrow/kicker label above a heading ("this one is a
  ban, not a default: no brief earns it back"), display type ≤ 6rem,
  tracking floor -0.04em, no bounce/elastic easing, no gradient text, no
  Unicode glyphs standing in for icons, theme browser surfaces (selection,
  scrollbar, focus ring, caret) from the palette. A pass applying this
  already removed every eyebrow label site-wide and the hero's
  `animate-bounce` scroll cue — don't reintroduce either.
- `.claude/skills/impeccable/scripts/impeccable detect --json src` runs
  its deterministic anti-pattern scanner (exit 0 = clean, 2 = findings).
  Cheap, run it after any visual change. The full `critique`/`audit`
  commands additionally want dual sub-agent orchestration, live browser
  injection, and persisted snapshots under `.impeccable/critique/` — real
  for a multi-surface product, overkill for this one-page site; the
  detector plus craft-floor is the practical subset actually used here.
- The PostToolUse/Stop **hook** that runs the detector automatically on
  every edit (`.claude/settings.json` in the upstream repo) was
  deliberately **not** installed — writing hook config is gated as
  self-modification and needs the user's own permission, and the hook's
  binary resolution needs `impeccable` installed globally (`npm install
  -g impeccable`) wherever Claude Code actually runs. Ask the user first
  if this should be turned on.

`emilkowalski/skills` is installed the same way as `leonxlnx/taste-skill`
(`npx skills@latest add emilkowalski/skills` → `.agents/skills/`,
symlinked into `.claude/skills/`). Most relevant here: `emil-design-eng`
(overall polish philosophy), `animate` / `review-animations` /
`improve-animations` (this project's GSAP work should hold up against
these), `apple-design` (spring/physical motion, restraint).

**Playwright** (`@playwright/test`) is a real devDependency now, not just
ad hoc scripts — `playwright.config.ts` + `tests/visual.spec.ts` screenshot
every section in both themes to `screenshots/` (gitignored). Run with
`npm run visual`. In this sandbox specifically, Playwright's usual
per-version browser download is blocked, but a Chromium is pre-installed
at a fixed path — point at it with
`PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium npm run visual`
(the config reads that env var and no-ops when it's unset, so a normal
`npx playwright install` + `npm run visual` works unchanged on any other
machine). Microsoft's own `microsoft/playwright` repo also ships
`.claude/skills/` — checked, and those are internal skills for
maintaining Playwright's own codebase (cherry-picking, CI triage, their
bug database), not usable here; don't install them.

## Design direction (in flux)

The user rejected the original SVG-illustrated mountain hero as "raw" /
too templated — see 3 alternative directions explored as a live HTML/CSS
mockup (GSAP, real scroll motion, not Figma) before touching the actual
site: cinematic ("Alpenglow", photographic gradient + serif), maximalist
("Kinetic Field", huge condensed type + marquee + cursor glow), and
editorial ("Alpine Editorial", magazine masthead + restrained motion).
The user also wants to swap the hand-drawn SVG mountains for an actual
photo (dusk/dawn mountain shot with a standing figure) — no such image
file has made it into this environment yet (pasted inline, not
attached), so the current hero is still the SVG version pending both a
direction decision and a real image file.

## Conventions

- Path alias `@/*` → `src/*`.
- Keep animation setup inside `useEffect` + `gsap.context(...)`, and always
  `ctx.revert()` in the cleanup — this repo mixes many mounted/unmounted
  animated components and leaking triggers causes visible scroll jank.
- Run `npx tsc --noEmit` and `npx eslint .` before considering a change done.
- No image assets checked in yet. If real photos/screenshots are added,
  put them in `public/` and reference with `next/image`.

## Known gaps / next steps

- `src/data/profile.ts` is filled in from the real resume already.
- No `public/resume.pdf` yet — `profile.resumeUrl` points at a file that
  doesn't exist until one is added.
- No real headshot/photo yet — About section uses an initials avatar.
- See "Design direction (in flux)" above — the hero is mid-redesign.
