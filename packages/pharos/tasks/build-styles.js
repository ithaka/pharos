import gulp from 'gulp';
import debug from 'gulp-debug';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import through2 from 'through2';
import prettier from 'gulp-prettier';
import sassCompiler from 'sass';

sass.compiler = sassCompiler;

const toCamelCase = (str) => {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
};

const buildStyles = async () => {
  return await gulp
    .src(['src/components/**/*.scss', '!src/components/**/*.styles.scss'], { base: '.' })
    .pipe(debug({ title: 'styles' }))
    // Convert to CSS
    .pipe(sass())
    // Run through PostCSS
    .pipe(postcss([autoprefixer()]))
    // Wrap in lit-element css template tag
    .pipe(
      through2.obj((file, enc, done) => {
        // Define style export name, ex: pharos-alert => alertStyles
        const componentName = file.path
          .split('/')
          .pop()
          .split('.css')[0]
          .replace(/^pharos-/, '');
        const styleName = toCamelCase(componentName) + 'Styles';

        file.contents = Buffer.from(`
            /**
             * THIS FILE IS GENERATED
             * DO NOT EDIT
             */\n
            import { css } from 'lit';\n
            export const ${styleName} = css\`
              ${file.contents}
            \`;
          `);
        done(null, file);
      })
    )
    // Update to TypeScript extension
    .pipe(
      rename((path) => {
        path.extname = '.css.ts';
      })
    )
    // Run through prettier
    .pipe(prettier())
    .pipe(gulp.dest('./'));
};

const buildSlotStyles = async () => {
  return await gulp
    .src(['src/components/**/*.styles.scss'], { base: '.' })
    .pipe(debug({ title: 'slot styles' }))
    // Convert to CSS
    .pipe(sass())
    // Run through PostCSS
    .pipe(postcss([autoprefixer()]))
    // Update filename
    .pipe(
      rename((path) => {
        path.basename = path.basename.replace(/.styles/, '');
        path.dirname = '';
      })
    )
    // Run through prettier
    .pipe(prettier())
    .pipe(gulp.dest('lib/styles'));
};

const watchBuildStyles = async () => {
  await gulp.watch(['src/components/**/*.scss'], gulp.parallel(buildStyles, buildSlotStyles));
};

const buildSassUtils = async () => {
  return await gulp
    .src(['src/utils/scss/*'], { base: './src/utils/' })
    .pipe(debug({ title: 'build sass utils' }))
    .pipe(gulp.dest('lib/utils'));
};

const buildSassStyles = async () => {
  return await gulp
    .src(['src/styles/*.scss'], { base: './src/styles/' })
    .pipe(debug({ title: 'build sass styles' }))
    .pipe(gulp.dest('lib/styles'));
};

const buildCssStyles = async () => {
  return await gulp
    .src(['src/styles/*.css'], { base: './src/styles/' })
    .pipe(debug({ title: 'build css styles' }))
    .pipe(gulp.dest('lib/styles'));
};

export {
  buildStyles,
  buildSlotStyles,
  watchBuildStyles,
  buildSassUtils,
  buildSassStyles,
  buildCssStyles,
};
