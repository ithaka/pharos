import { copyDir } from './copyDir.ts';

export const buildPatches = async () => {
  await copyDir('./patches', './lib/patches');
};

buildPatches();
