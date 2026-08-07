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

- Content was hand-written `.astro`, not Markdown. Item 5 below converted it:
  43 pages are MDX today, and the 20 that remain `.astro` are listed there with
  the reason each stays.
- Typos, odd spacing, and malformed inline styles from the Gatsby source are
  reproduced verbatim.
- 254 inline `style` attributes, because that is what the Gatsby components
  emitted.

This backlog undoes that where it no longer earns its keep.

## The gating question

**Is byte-for-byte parity with the Gatsby site still the acceptance test?**

**Answered: no.** Pixel parity is retired. The standard is now "as close as
reasonable" — match the design intent, and treat a small rendered difference as
acceptable when it buys a real maintainability gain.

Tier 2 and 3 are therefore unblocked. This does not license carelessness:
measure before and after, keep the copy identical unless a change is a
deliberate fix, and note anything that moves in the item's write-up.

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

## Tier 2 — changes rendered output

### 5. Convert prose pages to Markdown/MDX ✅ DONE

**43 pages are now MDX**; 20 remain `.astro`, all deliberately (see "Pages that
stay `.astro`" below). Every converted page's rendered text was diffed against
the pre-conversion build: 37 byte-identical, 6 differing only in ways that
render the same — see "The six remaining diffs".

The conversion was split across several parallel workstreams on disjoint sets of
files. Two things made that safe and are worth repeating for a similar bulk
edit: work from a written spec plus two or three already-converted reference
pages, and do not build concurrently — parallel builds race on `dist/` and
`.astro/` and report misleading failures. Convert, then build and verify once,
centrally.

**The infrastructure is in place and is the reusable part of this work:**

| File                                       | Role                                                                           |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| `src/components/markdown/Heading.astro`    | Maps Markdown depth to the Pharos `level`/`preset` pairs `PageSection` used    |
| `src/components/markdown/H1-H5.astro`      | Per-level wrappers MDX substitutes in                                          |
| `src/components/markdown/Link.astro`       | `[text](url)` as `<site-pharos-link>`; off-site links get `target="_blank"`    |
| `src/components/markdown/Example.astro`    | The demo + Storybook link that opened a component page                         |
| `src/components/markdown/DemoScript.astro` | A page's demo JavaScript, passed as a string so MDX does not parse it as JSX   |
| `src/components/markdown/mdxComponents.ts` | The element map; a page opts in with `export const components = mdxComponents` |
| `src/styles/markdown.css`                  | Section spacing, re-expressed for a flat document                              |
| `src/layouts/MarkdownLayout.astro`         | Generates the `<h1>` and standfirst from frontmatter                           |

A converted page now opens with frontmatter and one export, then is plain
Markdown — `### Alignment` where the `.astro` page needed
`<PageSection title="Alignment" subSectionLevel={1}>`.

**Geometry.** Converted pages run a few percent shorter than the Gatsby
original — measured at 1440px: `alert` −1.5%, `text-input` −3.9%,
`web-elements` −6.7%, `button` −7.3%. That is the intended effect of the
spacing model, not drift: heading margins now come from Pharos rather than being
overridden in `markdown.css`, and `##` carries `no-margin`. `help` is the one
page that got _taller_ (+8.9%) — it hand-wrote its headings instead of using
`PageSection`, so it was bespoke before and is now consistent with the rest.
Compare against the current pages, not the Gatsby ones, if you change spacing
again.

#### The six remaining diffs

All render identically; none is a content change.

| Pages                     | Difference                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------- |
| `checkbox`, `switch`      | `` `disabled` `` was literal backticks in the Gatsby copy, now `<code>`               |
| `dropdown-menu`, `footer` | `&#8594;` → `→`, `&reg;` → `®` — same glyph, decoded                                  |
| `combobox`                | `**not**` → `<strong>`, matching the baseline; a word-split artefact of the diff tool |
| `link`                    | `<li> Note:` → `<li>Note:` — leading whitespace, which HTML collapses                 |

#### MDX gotchas this surfaced

Each of these failed the build or changed output, and each is now handled:

- **A `<script>` in MDX is not opaque.** MDX parses the block as JSX, so the `{`
  opening any arrow function or object literal starts an expression it cannot
  finish. Astro also transpiles TypeScript in an `.astro` script but not in MDX,
  so `as (HTMLElement & {...})` is a syntax error. Use
  `src/components/markdown/DemoScript.astro`, which takes the code as a string
  prop and emits it with `set:html`. Three pages needed this.
- **GFM autolinks bare URLs.** `web-elements` documents _not_ writing out URLs,
  and Markdown turned its examples into live links. Wrapping in `<span>` does
  not help — autolinking happens inside it. Pass the string through a JSX
  expression: `{'https://www.example.com'}`.
- **A closing tag followed by more content on the same line** ends the JSX block
  early (`button`). Put the run inside a wrapper element.
- **A multi-line tag glued to the preceding word** loses the JSX whitespace
  trick that kept them adjacent (`tooltip`). Keep such a tag on one line.
- **`$` before an expression.** `footer` reproduced the Gatsby source's
  `${new Date().getFullYear()}` written as plain JSX text, which rendered the
  literal `©2000-$2026` on the live site. That is a bug in the demo copy, so the
  MDX evaluates the year properly.

**Per-heading drift is inherent, not a bug to chase.** The `.astro` pages nested
`PageSection`s and hung spacing on each wrapper's `margin-bottom`, so the same
`###` took a different gap depending on the section containing it. Markdown is
flat, so `markdown.css` expresses each level as a single `margin-top`, which
cannot reproduce a context-dependent gap.

**Bottom margins come from Pharos; only top margins live in `markdown.css`.**
`Heading.astro` passes through Pharos' `no-margin` attribute and turns it on for
`##`, where the gap to the following content belongs to that content. The
`margin-bottom` overrides that used to be in `markdown.css` are gone.

**Why the `md-heading` classes still exist, given Pharos styles headings.**
Worth stating because it is the obvious thing to try deleting. `preset` sets
font, size, line-height and the bottom margin — the heading's own typography. It
deliberately sets no _top_ margin, because "space before a new section" is page
layout, not a component concern; `PageSection` supplied it via its wrappers.
Removing the classes was measured, not assumed: every level collapses to the
same 24–32px gap, `##` and `###` stop being distinguishable, the standfirst runs
into the title, and `jstor-terms` loses 19% of its height. The classes now carry
inter-section spacing and nothing else.

**One rule depends on `no-margin` being set.** `.md-heading + .md-heading` (a
`##` immediately followed by a `###`, no prose between) keeps a small
`margin-top` rather than zero. With the `##`'s bottom margin gone, zero makes the
two headings collide — visible on `jstor-terms` under "Organization and
products".

**Two findings worth keeping:**

- _The class goes on `site-pharos-heading` itself, not a wrapper `<div>`._ The
  element is `display: block`, so a wrapper buys nothing and actively hurts: it
  blocks margin collapsing, so a heading's `margin-top` adds to the preceding
  paragraph's `margin-bottom` instead of absorbing it. Dropping it removed a DOM
  level _and_ improved accuracy — `jstor-terms` went from −56px to −24px against
  the original. `markdown.css` still zeroes the paragraph margin before a
  heading (`:has(+ .md-heading)`) so the heading alone owns the gap; skipping
  that made the page 328px too tall.
- _The `###` gap is 48px, not 80px._ `.section--level-one` (80px) looks like the
  source but only applies to a sub-section directly under a top-level one; the
  common case is `.section--less-margin` (24px) plus the paragraph's collapsed
  24px. Measure, don't read it off the class name.

**Prettier now ignores `src/pages/**/*.mdx`** (was just `overview.mdx`). It
reflows `<li>` onto several lines, and MDX wraps a multi-line tag in a generated
`<p>` — a cosmetic reformat silently adds paragraph margins. Verified: running
it on `checkbox.mdx` injected `<p>` into two list items.

**`overview.mdx` now takes its title like every other page.** It was the one
exception — a hand-rolled `<site-pharos-heading level="1" preset="1">` in the
body reading "Design tokens", while its frontmatter `title` (and so the `<title>`
tag) said "Overview". That forced a `hideTitle` escape hatch in the layout.

Its frontmatter is now `title: 'Design tokens'`, the inline `<h1>` is gone, and
its three remaining hand-written headings are Markdown. `hideTitle` is deleted,
along with the dead CSS rule that existed to serve it. Every page gets its `<h1>`
from `title`, and no page writes its own.

Renaming was safe because `overview` is one of the two `unlinkedByDesign`
orphans — nothing links to it by the name "Overview". This does change the
`<title>` tag, which is the intended fix.

**`BestPractices` is easier to write, and still slot-based.** It is the
most-used component on the site — 76 blocks across 38 pages, 18 of them in
`web-elements` alone. The real problem was never the `<Fragment>` wrapper — it
was that
whether the content sat on one line or three decided whether it rendered as bare
text or as a margined `<p>`, so reformatting for readability silently changed the
output. That is what forced the "keep it on one line" comments.

The fix is one CSS rule:

```css
.best-practices__guideline > p:only-child {
  margin-bottom: 0;
}
```

which makes the wrapped and unwrapped forms render identically — verified by
measuring both. Line breaks inside a slot are now free, so the syntax stays
familiar:

<!-- prettier-ignore -->
```mdx
<BestPractices>
  <Fragment slot="do">
    Journals on JSTOR span hundreds of years and more than 50 disciplines.
  </Fragment>
  <Fragment slot="dont">
    - Use checkboxes when choices are not mutually exclusive
    - Checkboxes should always include a label
  </Fragment>
</BestPractices>
```

Slot content is Markdown, so lists are `-` bullets rather than `<ul><li>` — 73 of
the 146 existing slots are a plain bulleted list, and 64 more are a single line
of text. The duplicated do/don't halves moved into `BestPracticesColumn.astro`,
so the pair is described once.

A props form (`do="…" dont="…"`) was built and then removed: it read badly at the
~100-character line lengths this copy needs, and forced escaping of the quotes
and apostrophes that are common in the guidance text.

Backward compatible: all 38 `.astro` consumers were verified pixel-identical,
and only `checkbox.html` changed text across all 63 pages. The other 62 differ
only by the added CSS rule.

**A `##`'s intro paragraph is now ordinary prose.** It used to be a
`PageSection description`, capped at 75% width; in Markdown it runs the full
column. Visible on `checkbox` under "Usage". Accepted as-is — adding a
first-paragraph convention would reintroduce the coupling between a heading and
the paragraph after it that Markdown just removed.

### Pages that stay `.astro`, deliberately

Not everything benefits. These were measured and left alone:

| Pages                     | Why                                                                                                                                                                                                |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 11 in `design-tokens/`    | Data transforms, not documents. Each imports tokens, maps them to rows, and renders one `<TokenRows>` — the body is a single element. Tier 1 item 3 already factored these.                        |
| 6 in `brand-expressions/` | Image-and-grid galleries. `iconography.astro` has **zero** `<p>` tags and 15 `<img>`; `typography.astro` has 38 headings inside grid cells. Markdown would mean wrapping nearly every line in JSX. |
| `index.astro`             | The homepage — a `fill` hero with bespoke layout and no `PageSection` at all.                                                                                                                      |
| `getting-started.astro`   | Mostly `CodeBlock` templates built from template literals.                                                                                                                                         |
| `404.astro`               | Nine lines, two elements.                                                                                                                                                                          |

The rule of thumb: convert a page whose content is **prose the writer edits**,
keep a page whose content is **data or layout the developer edits**.

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
Gatsby site's `static/` directory. The equivalent files _are_ tracked in
`packages/pharos-site/static/files/`. They remain on disk untracked. If a page
ever needs to link them, un-ignore them deliberately.
