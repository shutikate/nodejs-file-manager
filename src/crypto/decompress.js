import { resolve } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliDecompress } from 'node:zlib';

export const decompressFile = async (args) => {

  try {
    if (args.length === 0) {
      console.error('Invalid input');
    }
    else {
      const pathToFile = resolve(process.cwd(), args[0]);
      const destinationPath = resolve(process.cwd(), args[1]);
      const readStream = createReadStream(pathToFile);
      readStream.on('error', (error) => {
        console.error(`Operation failed! ${error.message}`)
      });
      const writeStream = createWriteStream(destinationPath, { flags: 'wx' });
      writeStream.on('error', (error) => {
        console.error(`Operation failed! ${error.message}`);
      });
      readStream.pipe(createBrotliDecompress()).pipe(writeStream);
    }
  }
  catch (error) {
    console.error(`Operation failed! ${error.message}`);
  }
}
