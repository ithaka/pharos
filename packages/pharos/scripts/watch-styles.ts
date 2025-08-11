import chokidar from 'chokidar';
import { buildStyles } from './build-styles.ts';

chokidar.watch('./src/components/**/*.scss').on('change', buildStyles).on('add', buildStyles);

console.log('Listening to style changes...');
