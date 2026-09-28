/**
 * The element map handed to MDX, substituting Pharos elements for the HTML tags
 * plain Markdown would emit. See
 * https://docs.astro.build/en/guides/integrations-guide/mdx/#custom-components-with-imported-mdx
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
