module.exports = {
  'packages/pharos/assets/icons/*.svg': [`svglint --ci`],
  '*.{ts,tsx,js,mjs}': ['eslint --fix'],
  '*.{scss,css}': ['stylelint --fix'],
  '**/!(.changeset)/*.md': (filenames) =>
    filenames.map((filename) => `yarn markdown-toc -i '${filename}'`),
  '!(*.css|*.test).ts': (filenames) =>
    filenames.map((filename) => `yarn lit-analyzer '${filename}' --strict`),
};
