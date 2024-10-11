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
    if (data === '.exit') {
      rl.close();
    } else {
      const input = data
        ? data.match(/(?:[^\s'"]+|'[^']*'|"[^"]*")+/g).map((args) => args.replace(/['"]/g, ''))
        : [];
      const command = input[0];
      const args = input.slice(1);

      startOperation(command, args);
      // rl.setPrompt(`You are currently in ${process.cwd()}${EOL}`);
      // rl.prompt();
      process.stdout.write(`You are currently in ${process.cwd()}${EOL}`);
    }
  });

  rl.on('close', () => process.stdout.write(`${closeMessage}${EOL}`));

}

await runFileManager();