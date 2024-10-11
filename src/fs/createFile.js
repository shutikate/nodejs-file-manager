import { resolve } from 'node:path';
import { open } from 'node:fs/promises';

export const createFile = async (args) => {
  let file;
  try {
    if (args.length === 0) {
      console.error('Invalid input');
    } else {
      const newFilePath = resolve(process.cwd(), args.join(' '));
      file = await open(newFilePath, 'w+');
    }
  }
  catch (error) {
    console.error(error.message)
  }
  finally {
    if (file) {
      await file.close();
    }
  }
}
