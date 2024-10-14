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
    const writeStream = createWriteStream(destinationPath, { flags: 'wx' });

    return new Promise((resolve, reject) => {
      readStream.on('error', (error) => {
        reject(error);
      });

      writeStream.on('error', (error) => {
        reject(error);
      });

      readStream.pipe(createBrotliCompress()).pipe(writeStream);

      writeStream.on('close', () => resolve());
    });
  }
  catch (error) {
    handleError(error);
  }
}
