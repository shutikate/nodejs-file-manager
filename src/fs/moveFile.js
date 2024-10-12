import { resolve } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { unlink } from 'node:fs/promises';

export const moveFile = async (args) => {
  try {
    if (args.length === 0) {
      console.error('Invalid input');
    } else {
      const pathToMoveFile = resolve(process.cwd(), args[0]);
      const nameOfMoveFile = pathToMoveFile.split('\\').pop();
      const pathToNewDirectory = resolve(process.cwd(), args[1], nameOfMoveFile);

      const writeStream = createWriteStream(pathToNewDirectory, { flags: 'wx' });

      writeStream.on('error', (error) => {
        console.error(`Operation failed! ${error.message}`);
      });

      const readStream = createReadStream(pathToMoveFile);

      readStream.on('error', (error) => {
        console.error(`Operation failed! ${error.message}`);
      });

      readStream.pipe(writeStream);

      writeStream.on('finish', () => {
        unlink(pathToMoveFile);
      });
    }
  }
  catch (error) {
    console.error(`Operation failed! ${error.message}`);
  }
}
