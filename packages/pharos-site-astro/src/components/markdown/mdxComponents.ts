/**
 * The element map handed to MDX so plain Markdown renders as Pharos elements.
 *
 * MDX substitution replaces the HTML tag names it would otherwise emit
 * (`h2`, `a`, ...) with components. That is what lets a content editor write
 *
 *     ### Alignment
 *
 * instead of
 *
 *     <PageSection title="Alignment" subSectionLevel={1}>
 *
 * and get the same rendered output. See
 * https://docs.astro.build/en/guides/integrations-guide/mdx/#custom-components-with-imported-mdx
 *
 * `MarkdownLayout.astro` spreads this into `<Content components={...} />`. A
 * page can override any single entry by passing its own map — the layout merges
 * this one underneath.
 */
import H1 from './H1.astro';
import H2 from './H2.astro';
import H3 from './H3.astro';
import H4 from './H4.astro';
import H5 from './H5.astro';
import Link from './Link.astro';

export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  a: Link,
};
