module.exports = {
  '*.{ts,tsx,mdx,js,mjs}': ['eslint --fix'],
  '*.{scss,css}': ['stylelint --fix'],
  '*.md': (filenames) => filenames.map((filename) => `yarn markdown-toc -i '${filename}'`),
};
