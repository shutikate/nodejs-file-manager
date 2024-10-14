import { resolve } from 'node:path';
import { unlink } from 'node:fs/promises';
import { handleError, inputError } from '../getMessages.js';

export const deleteFile = async (args) => {

  try {
    if (args.length !== 1) {
      console.error(inputError);
      return;
    }

    const deleteFilePath = resolve(process.cwd(), ...args);
    await unlink(deleteFilePath);
  }
  catch (error) {
    handleError(error);
  }
}
