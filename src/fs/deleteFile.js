import { resolve } from 'node:path';
import { unlink } from 'node:fs/promises';

export const deleteFile = async (args) => {
  try {
    if (args.length === 0) {
      console.error('Invalid input');
    } else {
      const deleteFilePath = resolve(process.cwd(), ...args);
      await unlink(deleteFilePath);
    }
  }
  catch (error) {
    console.error(`Operation failed! ${error.message}`);
  }
}
