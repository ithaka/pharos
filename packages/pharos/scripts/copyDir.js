import { promises as fsPromises } from 'fs';
import path from 'path';

export const copyDir = async (src, dest) => {
  await fsPromises.mkdir(dest, { recursive: true });
  let entries = await fsPromises.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory()
      ? await copyDir(srcPath, destPath)
      : await fsPromises.copyFile(srcPath, destPath);
  }
};
