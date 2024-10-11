import { checkFolderContent } from './checkFolderContent.js';
import { changeUp, changeDirectory } from './changePath.js';
import { readFile } from './fs/readFile.js';

const operations = {
  ls: checkFolderContent,
  up: changeUp,
  cd: changeDirectory,
  cat: readFile
}

export const startOperation = (command, args) => {
  if (operations[command]) {
    const operation = operations[command];
    operation(args);
  } else {
    console.error ('Invalid input');
  }
}
