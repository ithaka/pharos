import gulp from 'gulp';
import debug from 'gulp-debug';

const buildAssets = async () => {
  return await gulp
    .src(['assets/**/*'], { base: '.' })
    .pipe(debug({ title: 'build assets' }))
    .pipe(gulp.dest('lib'));
};

export { buildAssets };
