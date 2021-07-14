module.exports = {
  '*.{ts,tsx,mdx,js,mjs}': ['eslint --fix'],
  '*.{scss,css}': ['stylelint --fix'],
  '**/!(.changeset)/*.md': (filenames) =>
    filenames.map((filename) => `yarn markdown-toc -i '${filename}'`),
  '!(*.css|*.test)*.ts': ['lit-analyzer --strict'],
};
