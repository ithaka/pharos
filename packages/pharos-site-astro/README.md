# @ithaka/pharos-site-astro

An [Astro](https://astro.build) port of the Pharos documentation site, built to
render identically to the existing Gatsby site in `packages/pharos-site`.

Both packages currently coexist so the two can be run side by side and compared;
nothing in the Gatsby site was changed.

## Commands

Run from the repo root:

| Command                   | Description                                              |
| ------------------------- | -------------------------------------------------------- |
| `yarn site-astro:develop` | Build Pharos core, then start the dev server             |
| `yarn site-astro:build`   | Build Pharos core, then build the static site to `dist/` |
| `yarn site-astro:serve`   | Preview a built site                                     |
| `yarn site-astro:check`   | Type-check `.astro` files (also runs as `yarn lint`)     |
| `yarn site-astro:clean`   | Remove `dist/` and `.astro/`                             |

## How it differs from the Gatsby site

The rendered output is the same; the implementation is not.

- **Pages are `.astro`, not React.** Pages use the Pharos **web components**
  (`<site-pharos-button>`) rather than the React wrappers, so no React runtime
  ships. `src/pages/design-tokens/overview.mdx` is authored in MDX.
- **No client-side routing.** Gatsby intercepted link clicks and called
  `navigate()`; here links are ordinary anchors and each page is a static
  document.
- **Data comes from imports, not GraphQL.** Gatsby's `useStaticQuery` for site
  metadata is replaced by `src/lib/siteMetadata.ts`, and design tokens are
  imported directly from `@ithaka/pharos/lib/styles/tokens`.
- **Work happens at build time.** Components that computed values in `useEffect`
  (colour conversions, token tables) now do so during the build.

## Things to know before editing

**Custom element registration is minification-sensitive.** `src/lib/initComponents.ts`
registers each Pharos component under an explicit tag name derived from a string
literal. It deliberately does _not_ use Pharos' own `registerComponents` helper,
which derives tag names from `clazz.name` — minifiers rename those classes, which
would register `<site-oo>` and leave every component undefined. The same applies
to the `data-pharos-component` attribute, which the site's CSS targets.

**Whitespace around inline elements is significant.** Astro removes a newline
between a run of text and a following inline element, where JSX preserved a
space. Writing

```astro
<p>
  ...use the
  <code>hideSelectAll</code> variant
</p>
```

renders `use thehideSelectAll`. Keep the tag on the same line as the preceding
text, or break inside the tag itself. Some pages intentionally reproduce missing
spaces that exist in the Gatsby output — check against the live site before
"fixing" one.

**The copy is reproduced verbatim.** Typos, odd spacing, malformed inline styles
and unrendered Markdown in the source pages are all intentional, so that the two
sites read identically. Fix them in both places or neither.

One deliberate exception: `ColorGradients.astro` closes the `linear-gradient(`
that the Gatsby source leaves unclosed. React applied that style through the
CSSOM, which repairs the declaration, so the live site renders the gradients;
serialising the same broken string into a `style` attribute makes the browser
discard it, and the swatches disappear. Reproducing the typo there would _not_
reproduce the rendering.

**Global CSS that Gatsby got for free has to be explicit here.** Gatsby emitted a
single stylesheet, so rules written in one page's CSS module applied site-wide.
Astro scopes CSS per page. Anything global therefore belongs in
`src/styles/layout.css`, `src/styles/fonts-site.css`, or the shared layout —
notably the `@font-face` rules and the `p { margin-top: 0 }` reset, without which
every non-home route renders in a fallback font and gains 16px per section.

**`design-tokens/overview.mdx` is excluded from Prettier, deliberately.**
Prettier rewrites MDX comment delimiters (`{/* */}` → `{/_ _/}`), which fails the
build, and reflows `<dd>`/`<code>` onto several lines. MDX treats a tag whose
content spans multiple lines as Markdown and wraps it in a generated paragraph,
which changes the page height. Keep those elements on one line, and prefer plain
Markdown paragraphs over explicit `<p>` tags — a top-level `<p>` gets nested
inside MDX's own paragraph and leaves an empty one behind.

**Code blocks need their prism-compatible overrides.** `CodeBlock.astro` and
`src/lib/codeTheme.ts` reconcile Shiki with the prism-react-renderer output the
Gatsby site produced: block-level lines, an inherited font, a placeholder for
blank lines, and a theme that restores prism's keyword colours. Each has a
comment explaining the failure it prevents.

## Verifying parity

The port was validated against the **live production site** by diffing both
rendered text and full-page screenshots for all 62 routes.

Two harness lessons worth keeping if you rebuild this check:

- Compare `textContent` as well as `innerText`. Reading `innerText` before
  production's CSS lands reports `Token` vs `TOKEN` on the design-token tables
  even though the DOM is identical.
- Capture screenshots by scrolling in viewport-sized strips, not with
  `fullPage: true`. Growing the viewport makes the production sidenav re-render
  its nested links 16px to the left, which looks like a real regression.
