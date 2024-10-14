import { resolve } from 'node:path';
import { createReadStream } from 'node:fs';
import { EOL } from 'node:os';
import { handleError, inputError } from '../getMessages.js';

export const readFile = async (args) => {
  try {
    if (args.length !== 1) {
      console.error(inputError);
      return;
    }

    const pathToFile = resolve(process.cwd(), ...args);
    const readStream = createReadStream(pathToFile, { encoding: 'utf-8' });

    return new Promise((resolve, reject) => {
      readStream.on('error', (error) => {
        reject(error);
      });

      readStream.pipe(process.stdout);
      readStream.on('end', () => process.stdout.write(EOL));

      readStream.on('close', () => resolve());
    });
  }
  catch (error) {
    handleError(error);
  }
}
