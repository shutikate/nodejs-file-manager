import { resolve } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliDecompress } from 'node:zlib';
import { handleError, inputError } from '../getMessages.js';

export const decompressFile = async (args) => {

  try {
    if (args.length !== 2) {
      console.error(inputError);
      return;
    }

    const pathToFile = resolve(process.cwd(), args[0]);
    const destinationPath = resolve(process.cwd(), args[1]);

    const readStream = createReadStream(pathToFile);

    readStream.on('error', (error) => {
      handleError(error);
    });

    const writeStream = createWriteStream(destinationPath, { flags: 'wx' });

    writeStream.on('error', (error) => {
      handleError(error);
    });

    readStream.pipe(createBrotliDecompress()).pipe(writeStream);

  }
  catch (error) {
    handleError(error);
  }
}
