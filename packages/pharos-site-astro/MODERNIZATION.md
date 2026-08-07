# Astro site modernization backlog

Work plan for making `packages/pharos-site-astro` follow Astro best practices.

**Read this first if you are an agent picking this up cold.** It assumes no prior
context. Read `README.md` in this package before touching anything — it documents
several non-obvious constraints (minification-sensitive custom element
registration, whitespace handling around inline elements, MDX paragraph
wrapping) that will bite you otherwise.

## Background

This package is an Astro port of the Gatsby documentation site in
`packages/pharos-site`, added as a candidate replacement for Gatsby. The two
coexist so they can be compared side by side.

The initial commit (`20b7ce2`) was a deliberate 1:1 reproduction of the Gatsby
site's rendered output. It was validated against the **live production site** by
diffing rendered text and full-page screenshots across all 62 routes. Parity was
the acceptance test, so the port prioritized matching output over idiomatic
Astro. Consequences that look like mistakes but are intentional:

- Content is hand-written `.astro`, not Markdown. Only
  `src/pages/design-tokens/overview.mdx` is authored in MDX.
- Typos, odd spacing, and malformed inline styles from the Gatsby source are
  reproduced verbatim.
- 254 inline `style` attributes, because that is what the Gatsby components
  emitted.

This backlog undoes that where it no longer earns its keep.

## The gating question

**Is byte-for-byte parity with the Gatsby site still the acceptance test?**

**Still open.** It determines which tier below is safe to start. Tier 1 was
safe regardless and is now done. Tier 2 and 3 change rendered output and must
not start until parity is explicitly retired.

If you are an agent and this question is still unanswered, **ask before starting
Tier 2** — do not assume. Everything remaining in this backlog is gated on it.

## Verifying your work

```bash
yarn site-astro:check     # type-check .astro files
yarn site-astro:build     # full static build
yarn site-astro:develop   # dev server
```

Use `yarn`, never `npm`. Run these from the repo root.

For Tier 1 work, the build output should be byte-identical before and after. A
cheap way to confirm:

```bash
yarn site-astro:build && cp -r packages/pharos-site-astro/dist /tmp/dist-before
# ...make changes...
yarn site-astro:build && diff -r /tmp/dist-before packages/pharos-site-astro/dist
```

---

## Tier 1 — parity-safe ✅ DONE

All four items are complete. The build output was verified byte-identical to
the pre-change `dist/` (`diff -r`, all 63 pages), and the 11 design-token pages
were verified structurally identical to production — matching row counts, cell
counts, and pixel width/height for every table.

### 1. Delete the empty `src/content/` directory ✅

Removed.

### 2. Fix the positional coupling in `line-height.astro` ✅

`fontSizeMap` is now keyed by token name rather than paired by array index, and
throws on an unmapped token instead of silently rendering `undefined`. Adding,
removing or reordering a line-height token can no longer shift every row onto
the wrong font size.

### 3. Consolidate the design-token tables ✅

Added `src/components/TokenRows.astro`, which renders the shared
`Token / Value / Example` `<thead>` and the row loop from a `rows` array. All
11 pages use it. The example cell — the one genuine variation — is passed per
row as an HTML string and emitted with `set:html`.

Pages went from 624 to 453 lines (520 including the new component). Column
widths are a prop because the pages do not agree on them (40/30, 33/33/36,
40/40, and type-scale's four-column 25/20/25).

The duplicated `comment?: string` interfaces were hoisted into
`src/lib/tokenFormat.ts` as `CommentedToken`, plus `ScaleToken` for the two
pages where `comment` is required.

### 4. Add a nav-to-page assertion ✅

`src/lib/assertNavigation.ts` fails the build in both directions: a
`navigation.ts` entry with no matching page, and a page absent from
`navigation.ts`. Called once from `Sidenav.astro`. Explicit ordering is
preserved — the check only compares sets, it never derives order.

Both directions were verified by deliberately introducing each failure.

**Do not reach for `import.meta.glob` here.** The first attempt used it, and
because the sidenav renders on every page, it made every page a style
dependency of every other — each page's `<style is:global>` was pulled into one
bundle and inlined into all 63 pages, adding ~2.6KB each. The check reads the
pages directory with `node:fs` instead, which is inert. `PAGES_DIR` resolves
from `process.cwd()`, not `import.meta.url`, because the module is bundled into
`dist/.prerender/` before it runs.

Two pre-existing orphans are listed in `unlinkedByDesign` rather than fixed:
`/content-style-guide/jstor-terms` and `/design-tokens/overview`. Neither
appears in the Gatsby sidenav either, so linking or deleting them is a content
decision, not a port fix.

---

## Tier 2 — changes rendered output, needs parity retired

**Do not start until the gating question above is answered.**

### 5. Convert prose pages to Markdown/MDX

The highest-value change for maintainability. Currently a content editor must
know that a level-3 heading is spelled
`<site-pharos-heading level="3" preset="4">` and that spacing is an inline style
on a wrapper `<div>`.

Mechanism: [MDX component substitution](https://docs.astro.build/en/guides/integrations-guide/mdx/#custom-components-with-imported-mdx).
Pass `components={{ h2: ..., h3: ..., a: ... }}` from
`src/layouts/MarkdownLayout.astro` so plain Markdown headings render as Pharos
elements. This removes both the verbose heading syntax and a large share of the
inline styles at once.

Candidates, best-first (line count | Pharos tags — fewer tags means more purely
prose, so an easier conversion):

| Page | Lines | Pharos tags |
| --- | --- | --- |
| `content-style-guide/jstor-terms.astro` | 192 | **0** |
| `content-style-guide/editing-checklist.astro` | 119 | 1 |
| `content-style-guide/web-elements.astro` | 310 | 8 |
| `content-style-guide/grammar-and-style.astro` | 174 | 2 |
| `content-style-guide/voice-and-tone.astro` | 175 | 14 |
| `contributing/development.astro` | 125 | 16 |
| `contributing/documentation.astro` | 124 | 21 |
| `faqs.astro` | 73 | 9 |
| `help.astro` | 37 | 9 |

**Do `jstor-terms` first as a spike.** Zero Pharos tags makes it the cleanest
test of whether the substitution approach holds up. That one page is the
decision point for this entire direction — evaluate before converting the rest.

**Known hazard:** MDX treats a tag whose content spans multiple lines as
Markdown and wraps it in a generated `<p>`. During the port this added ~35px per
list entry and made one page 72px taller than production. It stops being a
*parity* problem once parity is retired, but it still affects layout — verify
visually, do not assume.

### 6. Replace inline styles with utility classes and scoped styles

254 inline `style` attributes. Unlintable, unreusable, invisible to a global
design change. Worst offenders: `brand-expressions/typography.astro` (31),
`elevation.astro` (28), `imagery.astro` (27), `components/heading.astro` (25),
`brand-expressions/color.astro` (24).

Only 3 files currently use Astro's scoped `<style>` blocks — the idiomatic tool
is going unused.

Recurring values like `margin-bottom: var(--pharos-spacing-3-x)` and
`font-size: var(--pharos-type-scale-4)` should become utility classes in
`src/styles/layout.css`.

While doing this, note `src/pages/components/button.astro:141`, which carries a
malformed declaration (`--pharos-spacing-one-half-x;` — missing closing paren)
preserved deliberately for parity. That is precisely the bug class inline styles
hide and a scoped `<style>` block would surface. Fix it when parity is retired.

### 7. Move component pages to a content collection

32 near-identical pages in `src/pages/components/` with uniform structure
(`title`, `description`, `storyBookType`). Replace with one `[...slug].astro`
route plus a `src/content.config.ts` Zod schema, so missing frontmatter fails
the build instead of review.

This pairs naturally with item 4 — a collection can drive the sidenav, removing
the hand-maintained list entirely (while keeping an explicit `order` field).

---

## Tier 3 — larger, independent decisions

### 8. Adopt `astro:assets` for images

82 raw `<img>` tags; `astro:assets` is not used at all. Astro's `<Image />`
gives dimension inference (preventing layout shift), format conversion, and
build-time validation that the file exists. Today a typo'd path under `/public`
is a broken image in production with no warning.

Changes emitted markup, so this is parity-blocked.

### 9. Lint `.astro` files

`lint` is aliased to `astro check`, which is type-checking only. There is no
ESLint pass over `.astro` files, so pages are not linted for accessibility or
dead code the way the rest of the monorepo is.

---

## Smaller cleanups

- **`src/components/PageSection.astro:28`** uses `console.error` for the invalid
  `isHeader` + `subSectionLevel` combination. This runs at build time, so the
  message scrolls past unnoticed. Make it `throw`, or better, express the
  constraint as a discriminated union in `Props` so `astro check` catches it.
- **`astro.config.mjs:39`** sets `preserveSymlinks: false`, which is Vite's
  default — a no-op. Harmless, but the comment makes it read as load-bearing.
- **62 near-identical `/** Ported from the Gatsby site's ... */` file headers**
  are useful while both packages coexist and become archaeology once
  `packages/pharos-site` is deleted. Fold the mapping into the README at that
  point.
- **`astro.config.mjs` `smartypants: false`** emits a deprecation warning
  pointing at a `satteri()` processor that does not exist in the installed
  `@astrojs/markdown-remark` (7.2.1). Revisit when that package is upgraded.

## Fixed along the way

**`src/lib/` was never committed with the port.** The repo's `.gitignore` has an
unanchored `lib/` rule for compiled build output, which also matched
`packages/pharos-site-astro/src/lib/`. All six hand-written modules there —
including `navigation.ts` and `siteMetadata.ts` — were untracked, so a fresh
clone had no `src/lib` at all and could not build the package. The rule is now
negated for that one directory. Worth checking whether any other package hit the
same trap.

## Assets note

The 8 brand-asset zips under `public/files/` are gitignored. Nothing in the
source or the built HTML references them — they were inherited by copying the
Gatsby site's `static/` directory. The equivalent files *are* tracked in
`packages/pharos-site/static/files/`. They remain on disk untracked. If a page
ever needs to link them, un-ignore them deliberately.
