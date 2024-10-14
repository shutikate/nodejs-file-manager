import { EOL } from 'node:os';

export const getOpenMessage = (user) => {
  return `Welcome to the File Manager, ${user}!${EOL}`;
}

export const getCloseMessage = (user) => {
  return `Thank you for using File Manager, ${user}, goodbye!${EOL}`;
}

export const getPathMessage = () => {
  return `You are currently in ${process.cwd()}${EOL}`;
}

export const handleError = (error) => {
  console.error (`Operation failed! ${error.message}${EOL}`);
}

export const inputError = `Invalid input${EOL}`;
