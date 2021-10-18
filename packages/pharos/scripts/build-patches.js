import { copyDir } from './copyDir.js';

export const buildPatches = async () => {
  await copyDir('./patches', './lib/patches');
};

buildPatches();
