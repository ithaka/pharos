module.exports = {
  // `.astro` has no built-in parser; without this prettier reports
  // "No parser could be inferred" and silently formats none of them.
  plugins: ['prettier-plugin-astro'],
  printWidth: 100,
  trailingComma: 'es5',
  tabWidth: 2,
  singleQuote: true,
  arrowParens: 'always',
  bracketSpacing: true,
};
