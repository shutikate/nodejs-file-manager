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

    readStream.on('error', (error) => {
      handleError(error);
    });

    const writeStream = createWriteStream(pathToNewDirectory, { flags: 'wx' });

    writeStream.on('error', (error) => {
      handleError(error);
    });

    readStream.pipe(writeStream);

    writeStream.on('finish', () => {
      unlink(pathToMoveFile);
    });
  }
  catch (error) {
    handleError(error);
  }
}
