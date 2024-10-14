import { readdir } from 'node:fs/promises';
import { handleError, inputError } from './getMessages.js';

export const checkFolderContent = async (args) => {

  try {
    if (args.length !== 0) {
      console.error(inputError);
      return;
    }

    const content = await readdir(process.cwd(), {withFileTypes: true});
    const folderContent = content.map((elem) => (
      { Name: elem.name,
        Type: elem.isDirectory() ? 'directory' : elem.isFile ? 'file' : 'symbolic link'
      }
    ))

    const directories = folderContent.filter((elem) => elem.Type === 'directory');
    const files = folderContent.filter((elem) => elem.Type === 'file');
    const symbolicLinks = folderContent.filter((elem) => elem.Type === 'symbolic link');

    console.table([...directories, ...files, ...symbolicLinks]);
  }
  catch (error) {
    handleError(error);
  }
}
