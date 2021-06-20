import { copyDir } from './copyDir.js';

export const buildAssets = async () => {
  await copyDir('./assets', './lib/assets');
};

buildAssets();
