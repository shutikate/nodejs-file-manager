import { checkFolderContent } from './checkFolderContent.js';
import { changeUp, changeDirectory } from './changePath.js';
import { readFile } from './fs/readFile.js';
import { createFile } from './fs/createFile.js';
import { renameFile } from './fs/renameFile.js';
import { deleteFile } from './fs/deleteFile.js';

const operations = {
  ls: checkFolderContent,
  up: changeUp,
  cd: changeDirectory,
  cat: readFile,
  add: createFile,
  rn: renameFile,
  rm: deleteFile
}

export const startOperation = (command, args) => {
  if (operations[command]) {
    const operation = operations[command];
    operation(args);
  } else {
    console.error ('Invalid input');
  }
}
