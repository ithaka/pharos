# @ithaka/pharos-site-astro

The Pharos documentation site, hosted at [pharos.jstor.org](https://pharos.jstor.org), built with [Astro](https://astro.build).

<!-- toc -->

- [Getting started](#getting-started)
- [Commands](#commands)
- [Project structure](#project-structure)
- [Adding a new page](#adding-a-new-page)
- [Authoring a page in Markdown](#authoring-a-page-in-markdown)
  - [Using components](#using-components)
    - [Example and Canvas](#example-and-canvas)
    - [BestPractices](#bestpractices)
    - [CodeBlock](#codeblock)
    - [DemoScript](#demoscript)
  - [MDX pitfalls](#mdx-pitfalls)
  - [How Markdown is processed](#how-markdown-is-processed)
  - [Spacing](#spacing)
- [Things to know before editing](#things-to-know-before-editing)
- [Deployment](#deployment)
- [Contributing and support](#contributing-and-support)
- [License](#license)

<!-- tocstop -->

## Getting started

Follow the main repo's [quick start guide](../../docs/development/quick-start.md) to
install Node.js and Yarn, then install dependencies and start the dev server
from the repo root:

```shell
$ yarn install
$ yarn site-astro:develop
```

This builds the Pharos core package first, then serves the site at
[localhost:4321](http://localhost:4321) with live reload.

## Commands

Run from the repo root:

| Command                   | Description                                              |
| ------------------------- | -------------------------------------------------------- |
| `yarn site-astro:develop` | Build Pharos core, then start the dev server             |
| `yarn site-astro:build`   | Build Pharos core, then build the static site to `dist/` |
| `yarn site-astro:serve`   | Preview a built site                                     |
| `yarn site-astro:check`   | Type-check `.astro` files (also runs as `yarn lint`)     |
| `yarn site-astro:clean`   | Remove `dist/` and `.astro/`                             |

## Project structure

| Path                      | Contents                                                           |
| ------------------------- | ------------------------------------------------------------------ |
| `src/pages/`              | Routes: one `.astro` or `.mdx` file per page, grouped by section   |
| `src/content/components/` | Component reference pages, rendered at `/components/<slug>`        |
| `src/components/`         | Shared page components; `markdown/` holds the MDX element mappings |
| `src/layouts/`            | The site shell (`Layout.astro`) and the MDX page layout            |
| `src/lib/`                | Navigation, site metadata, component registration, helpers         |
| `src/styles/`             | Global and shared CSS                                              |
| `public/`                 | Images and downloadable files, served as-is                        |
| `netlify.toml`            | Build and deploy config for the site                               |

A few principles run through the code:

- **Pages use the Pharos web components** (`<site-pharos-button>`) wherever
  possible, rather than custom markup.
- **Every page is a static document.** Links are ordinary anchors; there is no
  client-side routing.
- **Data comes from imports.** Site metadata lives in `src/lib/siteMetadata.ts`,
  and design tokens are imported directly from
  `@ithaka/pharos/lib/styles/tokens`.
- **Prefer work that can happen at build time.** Values such as color conversions and token
  tables are computed during the build, not in the browser.

## Adding a new page

1. Create the page:
   - **Component pages** go in the `components` content collection as
     `src/content/components/<slug>.mdx`.
   - **Everything else** goes under `src/pages/` as an `.astro` or `.mdx` file,
     in the folder for its section.
2. Add your page to the right list in `src/lib/navigation.ts`, which generates the
   sidenav. The order there is the order links appear. An entry's name becomes
   its URL slug (lowercased, spaces to hyphens, punctuation removed), so
   `'Checkbox group'` must match `checkbox-group.mdx`.
3. Preview the page with `yarn site-astro:develop`, and check the full build with `yarn site-astro:build`.
4. Open a [pull request](https://github.com/ithaka/pharos/pulls) with the
   change.

For what a component page should cover, see the site's
[contributing documentation](https://pharos.jstor.org/contributing/documentation)
guide and its template.

## Authoring a page in Markdown

Most new pages should be authored in MDX, like the existing documentation pages.
It is possible to create `.astro` pages, but they are kept for things which
require custom layouts or special handling:

- The home page
- The design token pages
- The brand expression pages

Using MDX helps keep the content accessible for contributors who are not familiar with HTML, as well as ensuring consistent styling and behavior across the site.

Start a new `.mdx` page under `src/pages/` with this:

```mdx
---
layout: '@layouts/MarkdownLayout.astro'
title: 'Some Page'
description: 'The intro paragraph under the page title.'
---

import { mdxComponents } from '@components/markdown/mdxComponents';

export const components = mdxComponents;

## A section

Ordinary markdown text. [A link](https://example.com) renders as a Pharos link and, if it
links off-site, automatically opens in a new tab.

### A sub-section
```

The `title` and `description` front matter render the page heading and introduction, so the body
starts at `##`. The `export const components` line is what turns Markdown
headings into Pharos elements; without it they render as bare `<h2>` tags.

Pages in the `components` collection need only the `title` and `description`.
Their route supplies the layout and the element mappings, and a collection
entry's own `export const components` is ignored.

### Using components

Pharos elements (`<site-pharos-button>`, `<site-pharos-link>`) are
registered for the whole site, so you can use them directly with no import.
Any other components need to be imported at the top of each page that uses them:

```mdx
import Example from '@components/markdown/Example.astro';
import Canvas from '@components/Canvas.astro';
import BestPractices from '@components/BestPractices.astro';
import CodeBlock from '@components/CodeBlock.astro';
import DemoScript from '@components/markdown/DemoScript.astro';
```

#### Example and Canvas

Put every live demo inside an `<Example>` or a `<Canvas>`:

- `<Example>` renders a live demo with a link to the component's Storybook
  page. It usually opens a component page, in the body above the first `##`.
  `storyBookType` is the Storybook section (`components`, `forms` or
  `organisms`), and `componentTitle` is the component's name, which becomes part of the Storybook URL.
- `<Canvas>` renders a live demo with no Storybook link, and can go anywhere.

```mdx
<Example storyBookType="forms" componentTitle="Checkbox">
  <site-pharos-checkbox>
    <span slot="label">I am a checkbox</span>
  </site-pharos-checkbox>
</Example>
```

Both containers also protect the demo's markup. MDX treats a tag whose content
spans several lines as Markdown and wraps that content in a generated `<p>`,
which adds a paragraph margin and can break a component's layout. Inside
`<Example>` and `<Canvas>`, the site's
[paragraph plugin](#how-markdown-is-processed) removes every generated `<p>`,
so demo markup can span as many lines as it needs. If a demo needs a real
paragraph, give the `<p>` a `class` to ensure it doesn't get removed.

#### BestPractices

`<BestPractices>` takes its content in a `do` and a `dont` slot:

```mdx
<BestPractices>
  <Fragment slot="do">Ebooks preserved in Portico</Fragment>
  <Fragment slot="dont">Portico preserves e-Books</Fragment>
</BestPractices>
```

Slot content is Markdown, so a list of dos or don'ts uses `-` bullets rather
than `<ul><li>`:

<!-- prettier-ignore -->
```mdx
<BestPractices>
  <Fragment slot="do">
    - Use checkboxes when choices are not mutually exclusive
    - Checkboxes should always include a label
  </Fragment>
</BestPractices>
```

Either slot may be omitted and that column is left out.

#### CodeBlock

Show code samples with `<CodeBlock>` rather than a fenced code block. It
highlights at build time with the site's theme, which fenced blocks don't use.
Put the code in an exported string so MDX doesn't parse it:

```mdx
export const buttonCode = `<site-pharos-button>Save</site-pharos-button>`;

<CodeBlock language="html" code={buttonCode} />
```

`language` defaults to `tsx`.

#### DemoScript

Use `<DemoScript>` for a demo's JavaScript, not a bare `<script>`. MDX parses a
script block's contents as JSX, so the first `{` breaks the build, and it doesn't
transpile TypeScript. Pass plain JavaScript as a string:

```mdx
<DemoScript
  code={`
  document.getElementById('open-modal')?.addEventListener('click', () => {});
`}
/>
```

### MDX pitfalls

- **Never write your own `#` heading.** The layout renders one from `title`, so
  a page that adds its own has two `<h1>`s, which causes accessibility issues.
- **Keep demo markup inside `<Example>` or `<Canvas>`.** Outside them, the
  plugin only removes a generated paragraph when it is the sole content of a
  `site-pharos-*` element. Any other tag keeps it, so keep that tag's content on
  one line.
- **Don't write a bare `<script>`.** Use [`<DemoScript>`](#demoscript).
- **Don't use Markdown tables, strikethrough or task lists.** They come from
  GitHub Flavored Markdown, which is
  [turned off](#how-markdown-is-processed).

### How Markdown is processed

`astro.config.mjs` sets up Markdown for both `.md` and `.mdx` files:

- **GitHub Flavored Markdown is off**, so bare URLs in demo
  markup don't become links nested inside links. This also turns off GFM tables,
  strikethrough and task lists, so write tables as HTML or with a component.
- **`rehypeUnwrapPharosParagraphs`** is the site's own
  [rehype](https://github.com/rehypejs/rehype) plugin, in
  `src/lib/rehypeUnwrapPharosParagraphs.ts`. It undoes CommonMark's paragraph
  wrapping where it doesn't belong:
  - Inside `<Example>` and `<Canvas>`, it removes every generated `<p>`, at any
    depth, because everything there is markup, not prose.
  - Inside a `site-pharos-*` element, it removes the `<p>` only when it is the
    element's only content.

### Spacing

Spacing lives in `src/styles/markdown.css`. Read its comments before changing a value.

The `md-heading` classes there set spacing only; all the typography comes from the Pharos `preset`.

## Things to know before editing

**Whitespace around inline elements is significant.** Astro removes a newline
between a run of text and a following inline element. Writing

```astro
<p>
  ...use the
  <code>hideSelectAll</code> variant
</p>
```

renders `use thehideSelectAll`. Keep the tag on the same line as the preceding
text, or break inside the tag itself.

**Styles are scoped to the file they're written in.** Astro scopes a `<style>`
block to its own page or component, so its rules don't apply anywhere else.
Anything global belongs in `src/styles/layout.css`,
`src/styles/fonts-site.css`, or the shared layout.

**`src/**/*.mdx` is excluded from Prettier, deliberately.** Prettier
rewrites MDX comment delimiters (`{/* */}` → `{/_ _/}`), which fails the build,
and reflows `<li>`/`<dd>`/`<code>` onto several lines, which MDX then wraps in
generated paragraphs (see [MDX pitfalls](#mdx-pitfalls)).

## Deployment

The site deploys to Netlify as the `pharos` site, using this package's
`netlify.toml`, which Netlify finds through the site's Package directory setting.

Before each build, Netlify runs the repo's `build-ignore.sh`, which skips the
build when nothing under `packages/pharos/`, this package, `package.json`,
`yarn.lock` or the root `netlify.toml` changed.

## Contributing and support

- The [contribution guide](../../docs/README.md) covers the repo's conventions
  and development workflow.
- Report problems or suggest changes in
  [GitHub issues](https://github.com/ithaka/pharos/issues).

## License

[MIT](../../LICENSE)
