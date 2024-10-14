import { checkFolderContent } from './checkFolderContent.js';
import { changeUp, changeDirectory } from './changePath.js';
import { readFile } from './fs/readFile.js';
import { createFile } from './fs/createFile.js';
import { renameFile } from './fs/renameFile.js';
import { deleteFile } from './fs/deleteFile.js';
import { copyFile } from './fs/copyFile.js';
import { moveFile } from './fs/moveFile.js';
import { printOSInformation } from './os/os.js';
import { calculateHash } from './crypto/hash.js';
import { compressFile } from './crypto/compress.js';
import { decompressFile } from './crypto/decompress.js';
import { inputError } from './getMessages.js';

const operations = {
  ls: checkFolderContent,
  up: changeUp,
  cd: changeDirectory,
  cat: readFile,
  add: createFile,
  rn: renameFile,
  rm: deleteFile,
  cp: copyFile,
  mv: moveFile,
  os: printOSInformation,
  hash: calculateHash,
  compress: compressFile,
  decompress: decompressFile
}

export const startOperation = async (command, args) => {
  if (operations[command]) {
    const operation = operations[command];
    await operation(args);
  } else {
    console.error(inputError);
  }
}
