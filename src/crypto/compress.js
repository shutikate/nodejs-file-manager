import { resolve } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { createBrotliCompress } from 'node:zlib';
import { handleError, inputError } from '../getMessages.js';

export const compressFile = async (args) => {

  try {
    if (args.length !== 2) {
      console.error(inputError);
      return;
    }

    const pathToFile = resolve(process.cwd(), args[0]);
    const destinationPath = resolve(process.cwd(), args[1]);

    await access(pathToFile);

    const readStream = createReadStream(pathToFile);

    readStream.on('error', (error) => {
      handleError(error);
    });

    const writeStream = createWriteStream(destinationPath, { flags: 'wx' });

    writeStream.on('error', (error) => {
      handleError(error);
    });

    readStream.pipe(createBrotliCompress()).pipe(writeStream);
  }
  catch (error) {
    handleError(error);
  }
}
