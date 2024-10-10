import { checkFolderContent } from "./checkFolderContent.js";
import { changeUp, changeDirectory } from "./changePath.js";

const operations = {
  ls: checkFolderContent,
  up: changeUp,
  cd: changeDirectory
}

export const startOperation = (command, args) => {
  if (operations[command]) {
    const operation = operations[command];
    operation(args);
  } else {
    console.error ('Invalid input');
  }
}
