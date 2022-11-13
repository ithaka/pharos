import { promises as fsPromises } from 'fs';
import sassdoc from 'sassdoc';

sassdoc.parse('./src/utils/scss/**/*.scss').then(async (data) => {
  await fsPromises.writeFile('./sass.json', JSON.stringify(data, null, 2), { flag: 'w' });
});
