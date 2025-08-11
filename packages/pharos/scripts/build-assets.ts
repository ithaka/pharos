import { copyDir } from './copyDir.ts';

export const buildAssets = async () => {
  await copyDir('./assets', './lib/assets');
};

buildAssets();
