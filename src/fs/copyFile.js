import { resolve } from 'node:path';
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
    const nameOfCopyFile = pathToCopyFile.split('\\').pop();
    const pathToNewDirectory = resolve(process.cwd(), args[1], nameOfCopyFile);

    await access(pathToCopyFile);

    const readStream = createReadStream(pathToCopyFile);

    readStream.on('error', (error) => {
      handleError(error);
    });

    const writeStream = createWriteStream(pathToNewDirectory, { flags: 'wx' });

    writeStream.on('error', (error) => {
      handleError(error);
    });

    readStream.pipe(writeStream);

  }
  catch (error) {
    handleError(error);
  }
}
