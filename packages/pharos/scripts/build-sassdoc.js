import * as fs from 'fs/promises';
import sassdoc from 'sassdoc';

sassdoc.parse('./src/utils/scss/**/*.scss').then(async (data) => {
  await fs.writeFile('./sass.json', JSON.stringify(data, null, 2), { flag: 'w' });
});
