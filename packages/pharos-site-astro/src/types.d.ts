/**
 * The Pharos web components are registered at runtime under the `site-` prefix
 * (see src/lib/initComponents.ts), so TypeScript has no intrinsic element for
 * them. Declaring an index signature for `site-pharos-*` lets `astro check`
 * type-check the pages without inventing per-component prop types that would
 * drift from the real Pharos definitions.
 */
declare namespace astroHTML.JSX {
  interface IntrinsicElements {
    [tagName: `site-pharos-${string}`]: Record<string, unknown>;
  }
}

/**
 * `@ithaka/pharos/lib/styles/tokens` ships the generated design tokens without
 * type declarations. The tree is deeply nested and its shape varies per
 * category, so it is typed as a recursive record; pages narrow to the concrete
 * token shape they need (see `DesignToken` in src/lib/tokenFormat.ts).
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
