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
 * A token carrying a human-readable `comment` .
 */
export interface CommentedToken extends DesignToken {
  comment?: string;
}

/**
 * A token whose `comment` is always present 
 */
export interface ScaleToken extends DesignToken {
  comment: string;
}

/**
 * For alias tokens (whose original value references another token, e.g.
 * `{color.marbleGray.30.value}`) returns the referenced global token's name.
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
