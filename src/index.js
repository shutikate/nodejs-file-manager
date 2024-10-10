import readline from 'node:readline/promises';
import { EOL, homedir } from 'node:os';
import { getNameOfUser } from './utils.js';
import { startOperation } from './startOperation.js';

process.chdir(homedir());

const runFileManager = async () => {

  const username = getNameOfUser();
  const greetingMessage = `Welcome to the File Manager, ${username}!${EOL}`;
  const closeMessage = `Thank you for using File Manager, ${username}, goodbye!${EOL}`;

  process.stdout.write(`${greetingMessage}`);
  process.stdout.write(`You are currently in ${process.cwd()}${EOL}`);

  const rl = readline.createInterface(process.stdin, process.stdout);

  rl.on('line', (data) => {
    if (data.toString() === '.exit') {
      rl.close();
    } else {
      startOperation(data.toString(), process.cwd());
      // rl.setPrompt(`You are currently in ${process.cwd()}${EOL}`);
      // rl.prompt();
      process.stdout.write(`You are currently in ${process.cwd()}${EOL}`);
    }
  });

  rl.on('close', () => process.stdout.write(`${closeMessage}${EOL}`));

}

await runFileManager();