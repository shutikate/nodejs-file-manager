import { dirname, parse, resolve } from 'node:path';

export const changeUp = async () => {
  try {
    const path = process.cwd();
    const parentDirname = dirname(path);
    const root = parse(path).root;

    parentDirname === root ? process.chdir(root) : process.chdir(parentDirname);
  }
  catch (error) {
    console.error(`Operation failed! ${error.message}`);
  }
}

export const changeDirectory = async (args) => {
  try {
    if (args.length !== 1) {
      console.error('Invalid input');
    } else {
      const path = resolve(process.cwd(), ...args);
      process.chdir(path);
    }
  }
  catch (error) {
    console.error(`Operation failed! ${error.message}`);
  }
}
