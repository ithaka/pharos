import gulp from 'gulp';

import { buildReact } from './tasks/build-react.js';
import {
  buildStyles,
  buildSlotStyles,
  watchBuildStyles,
  buildSassUtils,
  buildSassStyles,
  buildCssStyles,
} from './tasks/build-styles.js';
import { buildAssets } from './tasks/build-assets.js';

gulp.task('react', buildReact);
gulp.task(
  'styles',
  gulp.series(buildStyles, buildSlotStyles, buildSassUtils, buildSassStyles, buildCssStyles)
);
gulp.task('assets', buildAssets);
gulp.task('watch:styles', watchBuildStyles);

process.once('SIGINT', () => {
  process.exit(0);
});
