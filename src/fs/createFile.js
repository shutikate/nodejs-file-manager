import { resolve } from 'node:path';
import { open } from 'node:fs/promises';
import { handleError, inputError } from '../getMessages.js';

export const createFile = async (args) => {
  let file;

  try {
    if (args.length !== 1) {
      console.error(inputError);
      return;
    }

    const newFilePath = resolve(process.cwd(), ...args);
    file = await open(newFilePath, 'w+');

  }
  catch (error) {
    handleError(error);
  }
  finally {
    if (file) {
      await file.close();
    }
  }
}
