import { resolve, dirname } from 'node:path';
import { rename } from 'node:fs/promises';
import { handleError, inputError } from '../getMessages.js';

export const renameFile = async (args) => {

  try {
    if (args.length !== 2) {
      console.error(inputError);
      return;
    }

    const pathToFile = resolve(process.cwd(), args[0]);
    const directoryPath = dirname(pathToFile);
    console.log(directoryPath);
    const newName = resolve(directoryPath, args[1]);
    await rename(pathToFile, newName);
  }
  catch (error) {
    handleError(error);
  }
}
