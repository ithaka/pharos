/** Ported from the Gatsby site's design-token/toTokenFormat.tsx (string part only). */
export const toTokenName = (text: string): string =>
  '$' +
  text
    .replace(/([a-z])([A-Z]|[0-9])/g, '$1-$2')
    .replace(/([0-9])([a-z]|[A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])/g, '$1-$2')
    .toLowerCase();

/** A design token as emitted by `@ithaka/pharos/lib/styles/tokens`. */
export interface DesignToken {
  name: string;
  value: string;
  original: { value: string };
}

/**
 * A token carrying a human-readable `comment` alongside its value — e.g. the
 * pixel equivalent of a rem value. Optional because it is absent on some
 * members of groups that otherwise have it.
 */
export interface CommentedToken extends DesignToken {
  comment?: string;
}

/**
 * A token whose `comment` is always present — the type-scale tokens and the
 * font-size tokens that index into them, where the comment holds the pixel
 * value the page does arithmetic on.
 */
export interface ScaleToken extends DesignToken {
  comment: string;
}

/**
 * For alias tokens (whose original value references another token, e.g.
 * `{color.marbleGray.30.value}`) returns the referenced global token's name.
 * Ported from ColorRow.tsx.
 */
export const toOriginalTokenName = (token: DesignToken): string | undefined => {
  if (!token.original.value.startsWith('{color.')) {
    return undefined;
  }

  return (
    '$pharos-' +
    token.original.value
      .substring(1)
      .split('.')
      .slice(0, -1)
      .join('-')
      .replace(' ', '-')
      .toLowerCase()
  );
};
