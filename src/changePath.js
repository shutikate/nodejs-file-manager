import { dirname, parse, resolve } from 'node:path';
import { handleError, inputError } from './getMessages.js';

export const changeUp = () => {
  try {
    const path = process.cwd();
    const parentDirname = dirname(path);
    const root = parse(path).root;

    parentDirname === root ? process.chdir(root) : process.chdir(parentDirname);
  }
  catch (error) {
    handleError(error);
  }
}

export const changeDirectory = (args) => {
  try {
    if (args.length !== 1) {
      console.error(inputError);
    } else {
      const pathToDirectory = resolve(process.cwd(), ...args);
      process.chdir(pathToDirectory);
    }
  }
  catch (error) {
    handleError(error);
  }
}
