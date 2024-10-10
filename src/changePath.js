import { dirname, parse } from 'node:path';

export const changeUp = (path) => {
  const parentDirname = dirname(path);
  const root = parse(path).root;

  if (parentDirname === root) {
    process.chdir(root);
  } else {
    process.chdir(parentDirname);
  }
}

export const changeDirectory = (path) => {

}
