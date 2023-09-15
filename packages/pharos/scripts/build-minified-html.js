import * as fs from 'fs/promises';
import { globbyStream } from 'globby';

import { minifyHTMLLiterals } from 'minify-html-literals';

export const buildMinifiedHtml = async () => {
  for await (const componentPath of globbyStream([
    './lib/components/**/*.js',
    '!**/*.css.js',
    '!**/storyArgs.js',
  ])) {
    const component = await fs.readFile(componentPath, 'utf8');
    const minifiedCode = minifyHTMLLiterals(component)?.code;

    if (minifiedCode) {
      await fs.writeFile(componentPath, minifiedCode);
    }
  }
};

buildMinifiedHtml();
