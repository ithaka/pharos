/**
 * The Pharos components are registered at runtime under the `site-` prefix (see
 * src/lib/initComponents.ts), so TypeScript has no intrinsic element for them.
 * An index signature lets `astro check` run without inventing per-component
 * prop types that would drift from the real Pharos definitions.
 */
declare namespace astroHTML.JSX {
  interface IntrinsicElements {
    [tagName: `site-pharos-${string}`]: Record<string, unknown>;
  }
}

/**
 * The generated design tokens ship without type declarations. The tree is
 * deeply nested and varies per category, so it is typed as a recursive record;
 * pages narrow to the shape they need (`DesignToken` in lib/tokenFormat.ts).
 */
declare module '@ithaka/pharos/lib/styles/tokens' {
  interface TokenTree {
    [key: string]: TokenTree & {
      name?: string;
      value?: string;
      comment?: string;
      original?: { value: string };
    };
  }
  const tokens: TokenTree;
  export default tokens;
}
