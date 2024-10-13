import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';

export const calculateHash = async (args) => {

  try {
    if (args.length === 0) {
      console.error('Invalid input');
    }
    else {
      const pathToFile = resolve(process.cwd(), ...args);
      const readStream = createReadStream(pathToFile);
      readStream.on('error', (error) => {
        console.error(`Operation failed! ${error.message}`)
      })
      const hash = createHash('sha256');
      readStream.pipe(hash).setEncoding('hex').pipe(process.stdout);
    }
  }
  catch (error) {
    console.error(`Operation failed! ${error.message}`);
  }
}
