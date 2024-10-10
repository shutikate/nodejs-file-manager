import { checkFolderContent } from "./ls.js";
import { changeUp } from "./changePath.js";

const operations = {
  ls: checkFolderContent,
  up: changeUp
}

export const startOperation = async (input, path) => {
  if (operations[input]) {
    const operation = operations[input];
    operation(path);
  } else {
    console.error ('Invalid input');
  }
}
