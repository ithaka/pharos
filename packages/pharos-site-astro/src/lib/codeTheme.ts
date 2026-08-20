import nightOwl from '@shikijs/themes/night-owl';
import type { ThemeRegistration } from 'shiki';

/**
 * The `night-owl` theme with import/export keywords restyled to match the
 * prism-react-renderer rendering the site's code blocks were designed around.
 *
 * Both highlighters use "Night Owl", but they tokenize differently: prism
 * classified `import`, `export` and `from` as operators, which the theme paints
 * cyan (#7fdbca) and upright. Shiki's TextMate grammar reports them as
 * `keyword.control.*`, which the same theme paints purple (#c792ea) and italic.
 *
 * The rules below re-map only those control keywords, so every other token keeps
 * the stock Night Owl colour. Shiki writes token colours as inline styles, so
 * this has to happen in the theme -- a stylesheet cannot override it.
 *
 * The scopes must be fully language-qualified (`keyword.control.import.tsx`,
 * not `keyword.control.import`). Night Owl already styles `keyword`, and a
 * shorter scope loses to it during TextMate resolution, so the override is
 * silently ignored. Languages: `tsx` is CodeBlock's default and `html` is the
 * only other one used on the site.
 */
const KEYWORDS = ['import', 'export', 'from', 'as', 'default'];
const LANGUAGES = ['tsx', 'ts', 'js', 'jsx', 'html'];

const codeTheme: ThemeRegistration = {
  ...nightOwl,
  name: 'night-owl-pharos-site',
  tokenColors: [
    ...(nightOwl.tokenColors ?? []),
    {
      scope: LANGUAGES.flatMap((lang) =>
        KEYWORDS.map((keyword) => `keyword.control.${keyword}.${lang}`)
      ),
      settings: {
        fontStyle: '',
        foreground: '#7fdbca',
      },
    },
    /*
     * Shell snippets (`yarn add @ithaka/pharos`) are highlighted as TSX, since
     * that is CodeBlock's default and the pages pass no language. The TSX
     * grammar reads `@ithaka/pharos` as a decorator, and Night
     * Owl then paints the `/` purple where prism painted it cyan. These rules
     * restore prism's colouring for the decorator punctuation and its name.
     */
    {
      scope: LANGUAGES.flatMap((lang) => [
        `punctuation.decorator.${lang}`,
        `meta.decorator.${lang} keyword.operator.arithmetic.${lang}`,
      ]),
      settings: {
        fontStyle: '',
        foreground: '#7fdbca',
      },
    },
    {
      scope: LANGUAGES.map((lang) => `meta.decorator.${lang} variable.other.readwrite.${lang}`),
      settings: {
        fontStyle: '',
        foreground: '#82aaff',
      },
    },
    /*
     * Markup snippets. CodeBlock has no language prop, so even the HTML
     * examples are highlighted as TSX -- hence the `.tsx` scopes here rather
     * than `.html` ones. prism and Shiki's grammars disagree on nearly every
     * token, so these restore the colours prism rendered:
     * brackets, `=` and quotes purple; tag names and attribute values cyan;
     * attribute names the brighter green.
     */
    {
      scope: LANGUAGES.flatMap((lang) => [
        `punctuation.definition.tag.begin.${lang}`,
        `punctuation.definition.tag.end.${lang}`,
        `punctuation.definition.string.begin.${lang}`,
        `punctuation.definition.string.end.${lang}`,
      ]),
      settings: { fontStyle: '', foreground: '#c792ea' },
    },
    {
      scope: LANGUAGES.flatMap((lang) => [
        `entity.name.tag.${lang}`,
        `meta.tag.attributes.${lang} string.quoted.double.${lang}`,
        `meta.tag.attributes.${lang} string.quoted.single.${lang}`,
      ]),
      settings: { fontStyle: '', foreground: '#7fdbca' },
    },
    {
      scope: LANGUAGES.map((lang) => `entity.other.attribute-name.${lang}`),
      settings: { fontStyle: 'italic', foreground: '#addb67' },
    },
  ],
};

export default codeTheme;
