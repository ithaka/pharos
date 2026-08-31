/**
 * Removes the `<p>` CommonMark puts around a Pharos element's content.
 *
 * Written naturally, a demo reads
 *
 *     <site-pharos-button large>
 *       Large primary button
 *     </site-pharos-button>
 *
 * and CommonMark treats that indented run of text as a paragraph, so the output
 * is `<site-pharos-button><p>Large primary button</p></site-pharos-button>`.
 *
 * That is not configurable. It is core Markdown semantics, and neither Astro's
 * `markdown` options nor the MDX integration exposes a switch for it. The only
 * alternative is to keep every element's content on the same line as its tag.
 *
 * Only a *lone* paragraph is unwrapped — an element whose body is genuinely
 * several paragraphs keeps them.
 */
import type { Root, RootContent } from 'hast';

type MdxJsxNode = {
  type: 'mdxJsxFlowElement' | 'mdxJsxTextElement';
  name?: string | null;
  children: RootContent[];
};

type Parent = Root | MdxJsxNode | (RootContent & { children?: RootContent[] });

const isMdxJsx = (node: unknown): node is MdxJsxNode =>
  typeof node === 'object' &&
  node !== null &&
  ((node as { type?: string }).type === 'mdxJsxFlowElement' ||
    (node as { type?: string }).type === 'mdxJsxTextElement');

const isPharos = (node: unknown): boolean =>
  isMdxJsx(node) && typeof node.name === 'string' && node.name.startsWith('site-pharos-');

/** Whitespace-only text between tags is formatting, not content. */
const isInsignificant = (node: RootContent): boolean =>
  node.type === 'text' && node.value.trim() === '';

/** Exclude any`p` the has a class, it can't be something added automatically. */
const isBareParagraph = (node: RootContent): boolean =>
  node.type === 'element' && node.tagName === 'p' && !node.properties?.className;

export const rehypeUnwrapPharosParagraphs = () => (tree: Root) => {
  const visit = (node: Parent): void => {
    const children = (node as { children?: RootContent[] }).children;
    if (!Array.isArray(children)) return;

    for (const child of children) visit(child as Parent);

    if (!isPharos(node)) return;

    const significant = children.filter((c) => !isInsignificant(c));
    if (significant.length !== 1) return;

    const [only] = significant;
    if (isBareParagraph(only)) {
      (node as MdxJsxNode).children = (only as { children: RootContent[] }).children;
    }
  };

  visit(tree);
};
