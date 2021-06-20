import * as fs from 'fs/promises';
import path from 'path';
import globby from 'globby';
import sass from 'sass';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import prettier from 'prettier';
import { promisify } from 'util';
import { copyDir } from './copyDir.js';

const sassPromise = promisify(sass.render);

const toCamelCase = (str) => {
  return str.replace(/-([a-z])/g, (g) => {
    return g[1].toUpperCase();
  });
};

const setup = async () => {
  await fs.mkdir('./lib/styles', { recursive: true });
};

export const buildStyles = async () => {
  for await (const sassPath of globby.stream('./src/components/**/!(*.styles).scss')) {
    const dest = sassPath.replace('.scss', '.css.ts');
    const cssResult = await sassPromise({
      file: sassPath,
      outFile: dest,
    });
    const processedCSS = await postcss([autoprefixer])
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

    const options = prettier.resolveConfig.sync(sassPath);
    options.parser = 'typescript';
    const formatted = prettier.format(litStyles, options);
    await fs.writeFile(dest, formatted, { flag: 'w' });
  }
};

export const buildSlotStyles = async () => {
  for await (const slotPath of globby.stream('./src/components/**/*.styles.scss')) {
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

    const options = prettier.resolveConfig.sync(slotPath);
    options.parser = 'css';
    const formatted = prettier.format(processedCSS.css, options);
    await fs.writeFile(path.join('./lib/styles', dest), formatted, { flag: 'w' });
  }
};

export const buildSassUtils = async () => {
  await copyDir('./src/utils/scss', './lib/utils/scss');
};

export const buildSassStyles = async () => {
  for await (const sassPath of globby.stream('./src/styles/*.scss')) {
    await fs.copyFile(sassPath, path.join('./lib/styles', path.basename(sassPath)));
  }
};

export const buildCssStyles = async () => {
  for await (const cssPath of globby.stream('./src/styles/*.css')) {
    await fs.copyFile(cssPath, path.join('./lib/styles', path.basename(cssPath)));
  }
};

setup();
buildStyles();
buildSlotStyles();
buildSassUtils();
buildSassStyles();
buildCssStyles();
