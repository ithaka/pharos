import nightOwl from '@shikijs/themes/night-owl';
import type { ThemeRegistration } from 'shiki';

/**
 * The `night-owl` theme with import/export keywords restyled to match the legacy  site's
 * code blocks
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
     * Shell snippets (`yarn add @ithaka/pharos`) are highlighted as TSX, 
     * These restore the intended decorator colouring.
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
     * Markup snippets, also highlighted as TSX rather than HTML
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
