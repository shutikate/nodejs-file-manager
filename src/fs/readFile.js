import { resolve } from 'node:path';
import { EOL } from 'node:os';
import { createReadStream } from 'node:fs';

export const readFile = async (args) => {
  try {
    if (args.length === 0) {
      console.error('Invalid input');
    } else {
        const pathToFile = resolve(process.cwd(), args.join(' '));
        const stream = createReadStream(pathToFile, { encoding: 'utf-8' });
        stream.on('error', (error) => {
          console.error(`Operation failed! ${error.message}`);
        });
        stream.pipe(process.stdout);
        stream.on('end', () => process.stdout.write(EOL));
    }
  }
  catch (error) {
    console.error(`Operation failed! ${error.message}`);
  }
}