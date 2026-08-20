export const siteMetadata = {
  title: 'Pharos',
  subtitle: `JSTOR's Design System`,
  description:
    'The Pharos design system is our guiding light toward creating cohesive, supportive, and beautiful experiences for the intellectually curious.',
  author: '@jstor',
  image: {
    path: '/images/pharos-orb.png',
    height: '1000',
    width: '1700',
  },
  siteUrl: 'https://pharos.jstor.org',
} as const;

/**
 * Normalizes a build-time pathname to the URL visitors actually see.
 *
 * `build.format: 'file'` emits `/help.html`, so `Astro.url.pathname` carries a
 * `.html` suffix during the build while the site is served at `/help`. Stripping
 * it (and any trailing slash) keeps sidenav active state and canonical URLs
 * pointing at the served paths.
 */
export const toCleanPath = (pathname: string): string => {
  const withoutHtml = pathname.replace(/\.html$/, '');
  const withoutIndex = withoutHtml.replace(/\/index$/, '/');
  const trimmed = withoutIndex.length > 1 ? withoutIndex.replace(/\/+$/, '') : withoutIndex;
  return trimmed === '' ? '/' : trimmed;
};

export default siteMetadata;
