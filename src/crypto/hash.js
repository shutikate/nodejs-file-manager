import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { EOL } from 'node:os';
import { handleError, inputError } from '../getMessages.js';

export const calculateHash = async (args) => {

  try {
    if (args.length !== 1) {
      console.error(inputError);
      return;
    }

    const pathToFile = resolve(process.cwd(), ...args);
    const readStream = createReadStream(pathToFile);
    const hash = createHash('sha256');

    return new Promise((resolve, reject) => {

      readStream.on('error', (error) => {
        handleError(error);
      })

      readStream.pipe(hash).setEncoding('hex').pipe(process.stdout);
      readStream.on('end', () => process.stdout.write(EOL));

      hash.on('finish', () => resolve());
    });
  }
  catch (error) {
    handleError(error);
  }
}
