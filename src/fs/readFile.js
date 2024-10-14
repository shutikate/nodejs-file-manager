import { resolve } from 'node:path';
import { createReadStream } from 'node:fs';
import { handleError, inputError } from '../getMessages.js';

export const readFile = async (args) => {
  try {
    if (args.length !== 1) {
      console.error(inputError);
      return;
    }

    const pathToFile = resolve(process.cwd(), ...args);
    const readStream = createReadStream(pathToFile, { encoding: 'utf-8' });

    readStream.on('error', (error) => {
      handleError(error);
    });

    readStream.pipe(process.stdout);
  }
  catch (error) {
    handleError(error);
  }
}
