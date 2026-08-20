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

#### Full-site audit against production

All 62 routes were compared to the live site (rendered text, element counts,
image loading, page height, horizontal overflow). **51 pages have no substantive
difference.** The 10 that differ were each run down; none is a regression:

| Page(s)                        | Difference                                                                                          |
| ------------------------------ | --------------------------------------------------------------------------------------------------- |
| `checkbox`, `switch`           | `` `disabled` `` was literal backticks in Gatsby, now `<code>`                                      |
| `combobox`                     | `**not**` now renders as `<strong>`                                                                 |
| `footer`                       | the `©2000-$2026` bug in the demo copy, fixed                                                       |
| `coach-mark`, `modal`, `toast` | demo `<script>` contents counted by `textContent`; invisible, and verified to execute without error |
| `link`                         | a stray `- ` fixed — see below                                                                      |
| `multiselect-dropdown`         | 3 WCAG links render as links locally, as plain text on production                                   |
| `contributing/development`     | production emits an **empty** `<h2>`; the port does not                                             |

Two of these are places the port is _better_ than the live site.
`multiselect-dropdown` writes ordinary Markdown links, which Gatsby rendered as
plain text — every other component page links them, so production is the outlier.
`contributing/development`'s empty heading is a Gatsby artifact worth not
reproducing.

**Fixed: a doubled list marker on `link`.** The Gatsby source carried a stray
dash inside a list item, which the live site renders as a literal `- ` in the
text. Converted to MDX it became a _second_ list level, so the page rendered an
empty bullet wrapping a nested list. Removed — the list is now flat and the
literal dash is gone.

**Two traps in auditing this way**, both of which produced false alarms:

- `document.title` is useless as a comparison. Production is a client-rendered
  SPA that reports `Home | …` on every route regardless of the page.
- `textContent` includes `<script>` contents and collapses element boundaries,
  so a page with a demo script or a heading adjacent to its standfirst reports a
  spurious diff. Squash all whitespace before comparing, and exclude scripts.

The homepage is served at `/`, not `/index` — requesting the latter 404s and
looks like a catastrophic diff.

#### MDX gotchas this surfaced

Each of these failed the build or changed output, and each is now handled:

- **A `<script>` in MDX is not opaque.** MDX parses the block as JSX, so the `{`
  opening any arrow function or object literal starts an expression it cannot
  finish. Astro also transpiles TypeScript in an `.astro` script but not in MDX,
  so `as (HTMLElement & {...})` is a syntax error. Use
  `src/components/markdown/DemoScript.astro`, which takes the code as a string
  prop and emits it with `set:html`. Three pages needed this.
- **GFM rewrote bare URLs and emails into links — now off at the config level.**
  `web-elements` documents _not_ writing out URLs and Markdown turned its
  examples into live links; worse, `alert` wrote
  `<site-pharos-link href="#">support@jstor.org</site-pharos-link>` six times and
  GFM autolinked the text _inside_ the link, producing nested anchors with
  `href="mailto:…"` and `target="_blank"` that hijacked the click. `pill` turned
  two plain-text demo labels into live `mailto:` links.

  The per-occurrence fix was to escape each one as `{'support@jstor.org'}`.
  `markdown: { gfm: false }` in `astro.config.mjs` removes the whole class
  instead, and costs nothing here: **no page on the site uses a single GFM
  feature** — every table is hand-written HTML, and there is no strikethrough or
  task list. Verified by grep before switching it off.

### Element content on its own line — handled by a rehype plugin

This one had the widest blast radius (14 pages) and is the reason
`src/lib/rehypeUnwrapPharosParagraphs.ts` exists. Written naturally,

```mdx
<site-pharos-button large>Large primary button</site-pharos-button>
```

CommonMark reads the indented text as a paragraph, so the output is
`<site-pharos-button><p>…</p></site-pharos-button>`. The paragraph's 24px bottom
margin inflates the element: standard buttons rendered 58px instead of 34px,
large buttons 66px instead of 42px, and every row of `heading`'s preset demo was
wrong — on the page whose entire job is showing what the presets look like.

**There is no setting for this.** It is core Markdown semantics; neither the
`markdown` options nor the MDX integration exposes a switch. `gfm: false` does
not affect it (measured: 7 wrappers before and after on `button`). The
alternative — keeping every element's content on its tag's line — makes source
formatting load-bearing, which is a bad property for content pages.

The plugin unwraps a _lone_ generated `<p>` inside a `site-pharos-*` element, so
both spellings render identically and formatting stops mattering. An element
whose body is genuinely several paragraphs (the `alert` demos, `modal` with its
footer buttons) is left alone, as is any `<p>` the author classed by hand.

One gotcha if you touch it: in MDX a `<site-pharos-*>` tag is an
`mdxJsxFlowElement` carrying a `name`, **not** a hast `element` carrying a
`tagName`. A plugin that checks only for `element` silently matches nothing —
the first version of this one did, and reported success while changing zero
output.

### `.prettierignore` is still required

Not because of the `<p>` — the plugin makes that formatting-independent — but
because **Prettier corrupts MDX outright**. Running it on `heading.mdx` reformats
a multi-line tag into

```mdx
<site-pharos-heading
level="2"

> Presets
> </site-pharos-heading>
```

reading the closing `>` as a blockquote marker and producing a file that no
longer parses (`Unexpected end of file before attribute name`). Keep
`src/pages/**/*.mdx` in `.prettierignore`.

Relatedly, the MDX **build** parser rejects `>Text</tag>` on its own line even
though the dev server accepts it. If you hand-format a multi-line tag, join it
onto one line rather than leaving a bare `>` line.

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
The `margin-bottom` overrides that used to be in `markdown.css` are gone.

`Heading.astro` originally also set Pharos' `no-margin` on `##`, on the reasoning
that the following content supplies the gap. **That was wrong and has been
reverted** — see "The `##` bottom margin" below.

**Why the `md-heading` classes still exist, given Pharos styles headings.**
Worth stating because it is the obvious thing to try deleting. `preset` sets
font, size, line-height and the bottom margin — the heading's own typography. It
deliberately sets no _top_ margin, because "space before a new section" is page
layout, not a component concern; `PageSection` supplied it via its wrappers.
Removing the classes was measured, not assumed: every level collapses to the
same 24–32px gap, `##` and `###` stop being distinguishable, the standfirst runs
into the title, and `jstor-terms` loses 19% of its height. The classes now carry
inter-section spacing and nothing else.

#### The `##` bottom margin

`##` used to carry Pharos' `no-margin`, with `.md-heading + .md-heading` adding
16px back when a `###` followed immediately. The two cancelled out on paper, but
the model was wrong in a way that showed up visually:

- The heading _box_ rendered 36px against production's 52px, because the 16px
  had moved off the heading and onto whatever followed it. Every element below a
  `##` sat 16px high, compounding down the page.
- The gap under a `##` was **inconsistent within a single page** — 0px before a
  paragraph, 16px before a `###` — where production is a uniform 0. Visible on
  `pagination`, which drifted ~90px by "Accessibility".

Fixed by letting `##` keep Pharos' own bottom margin like every other level, and
setting `.md-heading + .md-heading` to `margin-top: 0` (the `##`'s bottom margin
is now the whole gap, which is what production shows).

Every `##` now measures 52px, matching production exactly, and `pagination` went
from a visible drift to +1% total page height. The remaining −3% to −9% on other
pages is the intended spacing model described above, not this bug.

**This is why a computed-style audit is not enough on its own.** Element counts,
colours and text all matched; what was wrong was the _distribution_ of a margin
between two elements, which only shows up if you measure the heading box itself
or look at the page.

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

**Done.** 242 literal attributes at the start of this pass (the 254 above
predates the MDX conversion); **75 remain** — a 69% reduction. Counting note:
`grep -c 'style='` reports 125, but 50 of those are `style={...}` template
interpolations whose value is computed per instance (`CodeBlock`, `Grid`, the
`${swatch}` locals in `elevation.astro`). Those are not extractable to a class
and were never in scope. The 75 literals that remain are one-offs — 14
`font-family` declarations on `brand-expressions/typography.astro` are the
specimen _content_, not styling of it.

Done so far:

| Slice                       | Attributes | How                                                     |
| --------------------------- | ---------: | ------------------------------------------------------- |
| do/don't guideline lists    |         12 | `.guideline-example__*` in `global.scss`                |
| redundant `color` on `<p>`  |         31 | deleted — `layout.css` already sets exactly that colour |
| `margin-bottom` spacing     |         61 | semantic names — scoped per page, or `.doc-*` for MDX   |
| `brand-expressions/` layout |         61 | scoped `<style>` blocks, one per page                   |
| `DosAndDonts` icon fills    |          2 | scoped `<style>` in the component                       |
| `.best-practice--spaced`    |          2 | `components.css`, next to the other `best-practices__*` |
| malformed declarations      |          4 | see below                                               |

**All six `brand-expressions/` pages are now free of inline styles**, and
`iconography`, `imagery`, `logos` and `color` are at zero.

**Spacing is named for its reason, not its value.** The first pass used
`.u-mb-1`-style utilities; they were replaced because a class named after a
measurement tells a reader nothing about why the space is there, and the number
is meaningless without knowing the Pharos scale. What the markup says now:

| Was      | Now                          | Means                                              |
| -------- | ---------------------------- | -------------------------------------------------- |
| `u-mb-1` | `.guidance`, `.doc-label`    | a heading/prose block sitting close to its example |
| `u-mb-2` | `.principle`, `.doc-topic`   | one named principle or documented topic            |
| `u-mb-3` | `.doc-topic--section`        | a topic that opens a section                       |
| `u-mb-5` | `.specimen`, `.doc-specimen` | a demo separated from what follows                 |

`.astro` pages express these in their own scoped `<style>`; MDX pages cannot
carry one, so their four names live in `markdown.css` as `.doc-*`. Eleven of the
heading cases needed no class at all — `.best-practice site-pharos-heading`
covers them in one rule.

Three traps, all caught by the before/after geometry check and worth knowing
before extending this:

- _Astro's scoping does not cross a component boundary._ A rule written in
  `color.astro` cannot target markup that `DosAndDonts` renders: each component
  gets its own `data-astro-cid`, and the selector is rewritten to match only the
  page's own elements. An attempt to distinguish the don't-column with
  `.dos-and-donts:has(…) .guidance` silently matched nothing. Use an explicit
  modifier on markup the page itself owns.
- _An element selector catches more than the class did._ Replacing
  `class="u-mb-1"` on headings with `.best-practice site-pharos-heading` also
  hit a heading followed by a `<p>`, which never had that margin — it gained
  16px. The rule now ends `:not(:has(+ p))`.
- _...and less._ Two headings in `System typefaces` carried `u-mb-1` but sit
  outside `.best-practice`, so the same swap dropped their margin to zero. They
  are `.specimen-label` now.

**Scoped `<style>` is the right tool for page layout, and it works on Pharos
elements.** The backlog noted only 3 files used Astro's scoped styles; that was
the idiomatic tool going unused. Each brand-expressions page now carries one
`<style>` block for its own layout. Verified that Astro's scoping applies
correctly to `site-pharos-*` custom elements (checked on `DosAndDonts`, whose
icon fills now match production exactly) — worth stating because scoping plus
custom elements is a plausible place for it to go wrong.

**What deliberately stays inline: content, as opposed to styling.** Nine of
`typography.astro`'s remaining ten attributes are the `font-family` of a type
specimen. Each one differs, and the typeface _is_ what the page is
demonstrating — hoisting them into classes would name nine single-use rules and
put the demonstrated value one indirection away from the demo. Only the shared
scaffolding around them (`font-size: 1.5rem; line-height: 2rem`, four
occurrences) became `.sample--display`.

The same test applies to the remaining 77: extract what is _layout_, leave what
is the _subject_ of the example.

The redundant-colour slice is the one worth repeating first on any new file: all
31 were `style="color: var(--pharos-color-text-20);"` on a `<p>`, which
`layout.css` already colours identically. They needed no replacement class at
all — check for that before writing CSS.

Two findings from that first slice, both of which will recur:

- _The malformed declarations are real, and there are four, not one._ A sweep for
  unbalanced parens in `style` attributes finds
  `margin-right: var(--pharos-spacing-one-half-x;` three times (`button` ×2,
  `toast`), plus `margin-bottom: 4rem);` at
  `brand-expressions/typography.astro:154`. The first kind renders _correctly_ by
  accident: the browser's error recovery closes the unterminated `var()` at
  end-of-input and resolves the 8px token, while the `fill` it swallowed was
  masked by the colour inherited from the `<li>`. Nothing flags it because
  nothing parses an inline style until a browser does.

  Re-run the sweep before touching a file:

  ```bash
  grep -rn 'style="' --include=*.astro --include=*.mdx src/ |
    grep -vE 'style="[^"]*"' # or the paren-balance check in the commit notes
  ```

- _Extracted rules can lose to `markdown.css`._ `.md-body li` sets the body text
  colour at specificity (0,1,1), so a plain `.guideline-example__item--do` ties
  and loses on source order — the extraction silently rendered every icon grey.
  Sidestepping that rule is _why_ these were inline. Chain the block and modifier
  (`.guideline-example__item.guideline-example__item--do`) rather than reaching
  for `!important`. Verify colour, not just geometry: the first attempt had
  correct margins and wrong colours everywhere.

**Verification loop that works here.** `diff -r` against a saved `dist/` is
useless on its own — any CSS change rewrites the bundle hash, which is inlined
into all 63 pages, so every page "differs". Normalize it first:

```bash
diff <(sed 's/Layout\.[A-Za-z0-9_-]*\.css/H/g' dist-baseline/$f) \
     <(sed 's/Layout\.[A-Za-z0-9_-]*\.css/H/g' dist/$f)
```

That reduces the noise to exactly the pages actually touched, and pairs with a
Playwright pass comparing computed styles against the live site.

**Fixed along the way: the `toast` guideline icons.** They rendered 24×48 against
24×24 on production — the MDX `<p>` inside the `<li>` became a full-height flex
item and stretched the icon. (`rehypeUnwrapPharosParagraphs` does not catch this
one: the `<p>` is inside an `<li>`, not directly inside a Pharos element.)
Confirmed present before this work, and fixed here because the cause was the
same flex row being extracted — `flex-shrink: 0; align-self: start` on the icon,
and zeroing the paragraph's margin. The page is 48px shorter as a result, which
is the correction.

**A utility class cannot always replace an inline style, and the failure is
silent.** Two of the 14 pages regressed on the first attempt:

- `components/sidenav` — `.md-body ul:has(+ .md-heading)` (0,2,1) zeroes the
  bottom margin of a list that precedes a heading, which outranks `.u-mb-1`
  (0,1,0), so the swap dropped 16px. That rule is _correct_ — the heading owns
  the gap — so the inline declaration was arguably always redundant. Reverted
  with a comment rather than changed: removing it is a spacing decision, not a
  styles-refactor one.
- `components/toast` — text moved 8px. This one was the malformed
  `var(--pharos-spacing-one-half-x;` finally applying properly, i.e. the
  intended fix, not a regression.

Both were caught only by comparing geometry, which is the point of the loop
below.

**Verify against the local site's own before/after, not production.** Production
is the right baseline for `.astro` pages, but _wrong_ for MDX-converted ones —
their DOM legitimately differs from Gatsby, so a node-by-node comparison
misaligns and reports every node as changed. `scratchpad/selfcheck.mjs` snapshots
computed colour, margins, font-size and box geometry for every element in
`main`, so a refactor can be diffed against itself:

```bash
git stash && node selfcheck.mjs before.json "$PAGES"; git stash pop
node selfcheck.mjs after.json "$PAGES"   # then diff the two
```

Ignore `x,y` when comparing — the harness's scroll position leaks into
`getBoundingClientRect()` and shifts every node uniformly (seen as a spurious
621-node diff on `brand-expressions/color`, which was zero once position was
excluded).

### 7. Move component pages to a content collection ✅ DONE

The 32 pages under `src/pages/components/` moved to `src/content/components/`,
rendered by a single `src/pages/components/[...slug].astro`. The frontmatter
contract they repeated 32 times and enforced nowhere now lives once in
`src/content.config.ts`, where `title` and `description` are both required —
omitting one fails the build naming the file and the field, instead of
rendering a page with no standfirst.

All 32 pages build byte-for-byte identical to before the move.

**`storyBookType` stayed in the body, deliberately.** The item description
above assumed it was frontmatter; it is actually a prop on `<Example>` in the
body, alongside the demo markup it configures. Moving it into the schema would
let a `z.enum(['components', 'forms', 'organisms'])` catch a typo that today
ships a 404 Storybook link silently — worth doing, but it splits the demo's
configuration from the demo's markup, so it was left as a separate decision.

**The sidenav still reads `navigation.ts`, and should keep doing so.** Deriving
it from the collection looks like an easy win — delete 32 hand-maintained lines
— but two things block it.

First, the sidenav labels are not the page titles. 8 of the 32 differ in case:
the sidenav uses sentence case (`Dropdown menu`, `Image card`, `Progress bar`)
while the page's own `title` is title case (`Dropdown Menu`, ...). That is
deliberate and matches production. Deriving labels from `title` would visibly
change 8 sidenav entries; preserving them needs a `navLabel` field, trading one
ordered list for 8 scattered overrides.

Second, the hand-maintained list is what makes item 4's nav→page check real. A
list generated from the collection cannot disagree with the collection, so that
direction — a typo in `navigation.ts` linking the sidenav at a 404 — would stop
being caught for the largest section on the site.

Excluding components from the assertion instead was considered and rejected for
the same reason: it would give up both directions on 32 of 63 pages.

`assertNavigation.ts` had to learn about collections to keep working — it scans
`src/pages` with `readdirSync`, which cannot see collection entries or resolve
a `[...slug]` route, so it failed all 32 component pages on the first build
after the move. It now enumerates collection entries separately
(`collectCollectionHrefs`) and skips `[...]` route files, which are renderers
rather than pages. Both failure directions were re-verified after the change.

**Gotcha for any future collection.** As page routes these files each carried
`export const components = mdxComponents`, which MDX honours only for a file
that is itself a route. Rendered through `<Content />` that export is silently
ignored, so the route must pass `components={mdxComponents}` explicitly.
Without it the pages still build — every `##` just quietly renders as a plain
`<h2>` instead of a `<site-pharos-heading>`.

Note `z` is imported from `astro/zod`, not `astro:content`. Astro 6 deprecated
the latter re-export; using it builds fine but emits four `astro check` hints.

---

## Tier 3 — larger, independent decisions

### 8. Adopt `astro:assets` for images ✅ DONE

All 82 `<img>` tags are converted and the 61 referenced assets moved from
`public/images/` to `src/images/`, where the build can see them. (The
"parity-blocked" note here was stale — the gating question above was answered
_no_ before this ran.)

**Rasters use `<Image />`; SVGs stay `<img>` with an imported asset.** Astro
imports an SVG as a _component_, which inlines it. That is wrong for this site:
`logos.astro` alone references 511 kB of SVG, so inlining would take
`logos.html` from 22 kB to ~530 kB of un-cacheable HTML to save 15 requests.
Importing the SVG as an asset and using `src={x.src}` gets the same
build-time validation, content-hashed URL, and intrinsic `width`/`height`
without inlining — the useful two thirds of the feature. Worth re-checking if
Astro ever separates "process an SVG" from "inline an SVG".

Payload, 1x, over the pages with raster images: **5,699 kB -> 1,657 kB (-71%)**.
Biggest wins are `color` (-93%), `tooltip` (-86%), `elevation` (-83%),
`voice-and-tone` (-74%), `typography` (-73%), and `imagery`'s hero alone
(1,458 kB PNG -> 47 kB WebP). The animated GIF on `tooltip` converts to
animated WebP with its 82 frames intact (1,687 kB -> 320 kB) — worth checking
whenever a GIF is involved, because losing the animation would be silent.

Images with both `width` and `height` went from **1 of 82 to all 82**, so the
boxes are reserved before load. `loading="lazy"` and `decoding="async"` are
emitted too.

**The one trap, and it bites every page: `<Image>` emits intrinsic
`width`/`height`, so any CSS rule that sets only a width now needs
`height: auto`.** Without it the height attribute pins the rendered height and
the image stretches. It cost 650px of extra page height on `imagery` and broke
`logos` and `typography` the same way. Four rules needed it: `.logo-hero`,
`.logo-variant`, `.principle-figure`, `.type-in-action img`, plus `.thumb` and
the home page thumbnails.

**Do not fix that with a global `img { height: auto }`.** It looks like the
tidy fix and it is not: Pharos' image-card sets its own image height, and a
global rule overrides it — `components/image-card` grew 422px and the footer
logo changed size on all 63 pages. Scope it to the rules that size by width.

Three real bugs surfaced by the type checker and the build, all pre-existing
and all inherited from the Gatsby source:

- `voice-and-tone.mdx`'s image had **no `alt` at all**. `astro:assets` makes
  that a build error. Gatsby shipped it to production silently. Alt text taken
  from the caption directly beneath the image.
- **Eight `width="800px"`-style attributes** on `elevation.astro`, plus
  `width="100%"` on `index.astro`. `width` on `<img>` takes a bare number;
  browsers were parsing the `px` leniently, so rendering was unaffected, but
  `<Image>`'s types reject it. The `px` ones became numbers; `100%` moved to
  CSS in `home.css`, where sizing belongs.
- `header.mdx` referenced `../images/jstor-logo.svg`, a relative path that
  happened to resolve. It is a real import now.

**38 unreferenced files remained in `public/images/`** — 33 under
`brand-expressions/` (the `logos/` set including `ADFL*.svg`, plus stragglers in
`color/` and `elevation/`), `homepage/home-contribute.svg`, and
`jstor-logo-inverse.svg`. ✅ **DONE** — deleted, see the smaller cleanup below.

Verification: normalized `dist/` diff (asset URLs and the CSS hash masked)
shows exactly the 12 pages with images changed and the other 51 byte-identical;
Playwright geometry across all 14 affected routes plus a control page shows
**12 of 14 pages at identical document height**, the other two off by 1-2px of
sub-pixel rounding. Two type specimens on `typography` render 3-5px smaller —
they now use the SVG's authored size (249x78, 347x94) instead of being scaled
~4% by their container, which is the more correct rendering and does not
reflow the page.

**Harness note:** `loading="lazy"` means a viewport-sized screenshot or an
unscrolled DOM query reports below-the-fold images as broken. Scroll the page
before measuring (`scratchpad/geomcheck.mjs` does). One image on
`components/image-card` legitimately never loads — it is the error-state card,
which Pharos hides on purpose; it was 0x0 before this change too.

### 9. Lint `.astro` files ✅ DONE

`eslint-plugin-astro` + `astro-eslint-parser` now run over the package's
`.astro` and `.ts` files. `lint` in this package is `astro check && eslint`,
and the root `lint:astro` calls it, so `yarn lint` covers both. **65 files, 0
errors, 0 warnings.**

The parser hands frontmatter to the TypeScript parser and the template to the
jsx-a11y rules, which is the coverage `astro check` never had — a missing
`alt`, a click handler with no keyboard equivalent, and unused frontmatter
bindings all fail the build now. Verified by injecting each and watching it
fail, rather than trusting a clean run: **a lint that matches no files also
exits 0**, which is exactly the trap described below.

`.astro` was added to `lint-staged.config.js` too; its `*.{ts,tsx,js,mjs}` glob
did not cover them, so pre-commit was skipping every page.

---

## Smaller cleanups

- **`src/components/PageSection.astro:28`** used `console.error` for the invalid
  `isHeader` + `subSectionLevel` combination. ✅ **DONE**, though not as
  proposed. A discriminated union would have typed a combination that can no
  longer occur: converting the prose pages to MDX (item 5) moved sub-section
  headings to `markdown/Heading.astro`, leaving **`subSectionLevel`,
  `lessMargin` and `topMargin` with zero call sites**. Deleting the three dead
  props removes the conflict along with the check, collapses both nested
  ternaries, and drops five now-unreachable `.section--*` rules from
  `components.css` (-302 B). `markdown.css` kept the gap measurements it
  derived from those rules, reworded to state the values directly rather than
  name classes that no longer exist.

  Grep is misleading here — all four surviving `subSectionLevel` mentions are
  prose inside doc comments, so the prop reads as live until you check for an
  actual call site. Passing it is now a build-failing type error, verified by
  injecting one rather than trusting a clean run.
- **`astro.config.mjs:39`** set `preserveSymlinks: false`, which is Vite's
  default — a no-op. ✅ **DONE.** Removed with its comment, which also had the
  meaning backwards: `false` resolves symlinks to their real path rather than
  preserving them. `dist/` byte-identical across all 63 pages.
- **62 near-identical `/** Ported from the Gatsby site's ... */` file headers**
  are useful while both packages coexist and become archaeology once
  `packages/pharos-site` is deleted. Fold the mapping into the README at that
  point.
- **38 unreferenced files in `public/images/`** (5.2 MB). ✅ **DONE.** Deleted,
  with the empty directories they left behind — several of which `astro:assets`
  had already emptied. `logo.svg` is unreferenced too and was **kept**: it is
  the site's own logo and a plausible favicon asset, so its absence from the
  markup reads as an omission rather than dead weight, which makes removing it
  a content decision rather than a cleanup.

  Two traps when re-checking this kind of sweep. A `public/` file is consumed by
  URL, so grepping `src/` is not sufficient — sweep the repo and check built
  HTML. And a basename match is not a reference: `jstor-logo-inverse.svg` looks
  live because six files in `packages/pharos` name it, but each imports that
  package's own copy under `src/utils/_storybook/`; `logo.svg` looked live only
  as a substring of that longer name. `home-contribute.svg` was never referenced
  by the Gatsby source either — the homepage has three cards, not four.

- **`astro.config.mjs` `smartypants: false`** emits a deprecation warning
  pointing at a `satteri()` processor that does not exist in the installed
  `@astrojs/markdown-remark` (7.2.1). Revisit when that package is upgraded.

## Inherited defects, cleaned up

The port deliberately reproduced several bugs from the Gatsby source to keep
parity. With the gating question answered _no_, the ones that are visible to a
reader were fixed. Each was verified to change only its own page.

- **`combobox` never linked to Storybook.** The Gatsby source spells the prop
  `istoryBookType`, so `PageSection` received no `storyBookType` and silently
  skipped the Example block — the only component page of 32 missing its
  "See live code examples in Storybook" link. Now wrapped in `<Example
  storyBookType="forms" componentTitle="Combobox">`, matching the other seven
  form controls. The story exists (`title: 'Forms/Combobox'` in
  `pharos-combobox.wc.stories.ts`), so the generated URL resolves. Worth
  noting the published `storybook/index.json` lists only two docs entries, so
  it cannot be used to check a story's existence — read the `.stories.ts`
  `title` in this repo instead.
- **`design-tokens/overview` showed raw Markdown.** Two strings the Gatsby page
  rendered verbatim as JSX text were being escaped (`\_design tokens\_`,
  `\[the development documentation](https://…)`) purely to match. The second
  put a full GitHub URL in the body copy. Both are real Markdown now. The page
  is 72px shorter as a result: the link paragraph drops a line, and the first
  paragraph drops one because `_design tokens_.Tokens` was also missing the
  space after its period.
- **Three more prose typos on the same page**, all present in the Gatsby source
  and all on production: a second missing space (`naming structure.Tokens`) and
  two compound adjectives broken by a spaced hyphen (`high - level`,
  `well - defined`). The hyphen ones are easy to miss two ways — the Gatsby
  source wraps mid-phrase so a grep for the whole phrase does not match, and a
  spaced hyphen is also legitimate as a dash elsewhere on the site
  (`The default state - when no other state attribute…` on `combobox`,
  `multiselect-dropdown` and `loading-spinner` are correct and were left
  alone). Only compound adjectives were changed.
- **Four more unterminated `var(` declarations**, in `overview.mdx`'s exported
  style objects (`jstorRed`, `nightBlue`, `glacierBlue`, `livingCoral`, used
  20×). Same class as the ones found earlier, and same reason nothing flagged
  them. Confirmed harmless before changing: the browser's error recovery closes
  the `var()` at end-of-input, and computed colours are byte-identical before
  and after. Cosmetic fix only. (Three of the four resolve to black in both
  builds — those tokens are not defined in this build, which is pre-existing
  and untouched here.)
- **"occured"** on `components/radio-button`.

**Left alone deliberately:** `id="misson-text"` in the `footer` example. It
looks like a typo and is not the site's to fix — that exact id ships from
`packages/pharos/src/pages/shared/wc/footer.ts` and the React equivalent, so
the demo copy is showing real library usage. Changing it here would make the
example diverge from what consumers actually get.

Verification: normalized `dist/` diff shows **exactly 3 of 63 pages changed**
and the other 60 byte-identical; a Playwright pass confirms combobox gains its
Storybook link (+164px), `radio-button` and a `button` control page are
unchanged in height, and every `dt` swatch colour on `overview` is identical.
Serve the built site with plain `npx serve dist`, **not** `serve -s` — SPA mode
rewrites every route to `index.html`, which makes all 63 pages measure the same
and looks like a passing comparison.

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
