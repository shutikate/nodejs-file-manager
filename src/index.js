import readline from 'node:readline/promises';
import { EOL, homedir } from 'node:os';
import { getNameOfUser } from './utils.js';
import { startOperation } from './startOperation.js';

const runFileManager = async () => {

  const username = getNameOfUser();
  const greetingMessage = `Welcome to the File Manager, ${username}!`;
  const closeMessage = `Thank you for using File Manager, ${username}, goodbye!`;
  process.stdout.write(`${greetingMessage}${EOL}${EOL}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.setPrompt(`You are currently in ${homedir()}${EOL}`);
  rl.prompt();

  rl.on('line', (data) => {
    if (data.toString() === '.exit') {
      rl.close();
    } else {
      rl.prompt();
      startOperation(data.toString(), homedir());
    }
  });

  rl.on('close', () => process.stdout.write(`${closeMessage}${EOL}`));

}

await runFileManager();