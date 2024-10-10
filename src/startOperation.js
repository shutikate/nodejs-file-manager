import { checkFolderContent } from "./ls.js";

const operations = {
  ls: checkFolderContent
}

export const startOperation = (input, path) => {
  const commands = Object.keys(operations);
  if (commands.includes(input)) {
    const operation = operations[input];
    operation(path);
  } else {
    console.error ('Invalid input');
  }
}
