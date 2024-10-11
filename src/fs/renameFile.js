import { resolve } from 'node:path';
import { rename } from 'node:fs/promises';

export const renameFile = async (args) => {
  try {
    if (args.length === 0) {
      console.error('Invalid input');
    } else {
      const pathToFile = resolve(process.cwd(), args[0]);
      const newName = args[1];
      await rename(pathToFile, newName);
    }
  }
  catch (error) {
    console.error(`Operation failed! ${error.message}`);
  }
}
