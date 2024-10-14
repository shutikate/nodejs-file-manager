import { resolve, basename } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { access, unlink } from 'node:fs/promises';
import { handleError, inputError } from '../getMessages.js';

export const moveFile = async (args) => {

  try {
    if (args.length !== 2) {
      console.error(inputError);
      return;
    }

    const pathToMoveFile = resolve(process.cwd(), args[0]);
    const nameOfMoveFile = basename(pathToMoveFile);
    const pathToNewDirectory = resolve(process.cwd(), args[1], nameOfMoveFile);

    await access(pathToMoveFile);

    const readStream = createReadStream(pathToMoveFile);
    const writeStream = createWriteStream(pathToNewDirectory, { flags: 'wx' });

    return new Promise((resolve, reject) => {
      readStream.on('error', (error) => {
        reject(error);
      });

      readStream.pipe(writeStream);

      writeStream.on('error', (error) => {
        reject(error);
      });

      writeStream.on('finish', () => {
        unlink(pathToMoveFile);
      });

      writeStream.on('close', () => resolve());
    });
  }
  catch (error) {
    handleError(error);
  }
}
