import { promises as fsPromises } from 'fs';
import path from 'path';
import { globbyStream } from 'globby';
import sass from 'sass';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { promisify } from 'util';
import { copyDir } from './copyDir.js';

const sassPromise = promisify(sass.render);

const toCamelCase = (str) => {
  return str.replace(/-([a-z])/g, (g) => {
    return g[1].toUpperCase();
  });
};

const setup = async () => {
  await fsPromises.mkdir('./lib/styles', { recursive: true });
};

export const buildStyles = async () => {
  for await (const sassPath of globbyStream('./src/components/**/!(*.styles).scss')) {
    const dest = sassPath.replace('.scss', '.css.ts');
    const cssResult = await sassPromise({
      file: sassPath,
      outFile: dest,
    });

    const processedCSS = await postcss([autoprefixer, cssnano])
      .process(cssResult.css, {
        from: undefined,
      })
      .then((result) => {
        return result;
      });

    const componentName = path.basename(sassPath, '.scss').replace(/^pharos-/, '');
    const styleName = toCamelCase(componentName) + 'Styles';
    const litStyles = `
      /**
       * THIS FILE IS GENERATED
       * DO NOT EDIT
       */\n
      import { css } from 'lit';\n
      export const ${styleName} = css\`
        ${processedCSS.css}
      \`;
    `;

    await fsPromises.writeFile(dest, litStyles, { flag: 'w' });
  }
};

export const buildSlotStyles = async () => {
  for await (const slotPath of globbyStream('./src/components/**/*.styles.scss')) {
    const dest = path.basename(slotPath).replace('.styles.scss', '.css');
    const cssResult = await sassPromise({
      file: slotPath,
      outFile: dest,
    });
    const processedCSS = await postcss([autoprefixer])
      .process(cssResult.css, {
        from: undefined,
      })
      .then((result) => {
        return result;
      });

    await fsPromises.writeFile(path.join('./lib/styles', dest), processedCSS.css, { flag: 'w' });
  }
};

export const buildSassUtils = async () => {
  await copyDir('./src/utils/scss', './lib/utils/scss');
};

export const buildSassStyles = async () => {
  for await (const sassPath of globbyStream('./src/styles/*.scss')) {
    await fsPromises.copyFile(sassPath, path.join('./lib/styles', path.basename(sassPath)));
  }
};

export const buildCssStyles = async () => {
  for await (const cssPath of globbyStream('./src/styles/*.css')) {
    await fsPromises.copyFile(cssPath, path.join('./lib/styles', path.basename(cssPath)));
  }
};

setup();
buildStyles();
buildSlotStyles();
buildSassUtils();
buildSassStyles();
buildCssStyles();
