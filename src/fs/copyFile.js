import { resolve, basename } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { handleError, inputError } from '../getMessages.js';

export const copyFile = async (args) => {

  try {
    if (args.length !== 2) {
      console.error(inputError);
      return;
    }

    const pathToCopyFile = resolve(process.cwd(), args[0]);
    const nameOfCopyFile = basename(pathToCopyFile);
    const pathToNewDirectory = resolve(process.cwd(), args[1], nameOfCopyFile);

    await access(pathToCopyFile);

    const readStream = createReadStream(pathToCopyFile);
    const writeStream = createWriteStream(pathToNewDirectory, { flags: 'wx' });

    return new Promise((resolve, reject) => {
      readStream.on('error', (error) => {
        reject(error);
      });

      readStream.pipe(writeStream);

      writeStream.on('error', (error) => {
        reject(error);
      });

      writeStream.on('close', () => resolve());
    });
  }
  catch (error) {
    handleError(error);
  }
}
