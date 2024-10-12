import { resolve } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';

export const copyFile = async (args) => {
  try {
    if (args.length === 0) {
      console.error('Invalid input');
    } else {
      const pathToCopyFile = resolve(process.cwd(), args[0]);
      const nameOfCopyFile = pathToCopyFile.split('\\').pop();
      const pathToNewDirectory = resolve(process.cwd(), args[1], nameOfCopyFile);

      const writeStream = createWriteStream(pathToNewDirectory, { flags: 'wx' });

      writeStream.on('error', (error) => {
        console.error(`Operation failed! ${error.message}`);
      });

      const readStream = createReadStream(pathToCopyFile);

      readStream.on('error', (error) => {
        console.error(`Operation failed! ${error.message}`);
      });

      readStream.pipe(writeStream);
    }
  }
  catch (error) {
    console.error(`Operation failed! ${error.message}`);
  }
}
