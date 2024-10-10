import { readdir } from 'node:fs/promises';

export const checkFolderContent = async () => {

  try {
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
    console.error(`Operation failed! ${error.message}`);
  }

}
