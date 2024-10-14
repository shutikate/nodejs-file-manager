import readline from 'node:readline/promises';
import { homedir } from 'node:os';
import { getNameOfUser } from './utils.js';
import { startOperation } from './startOperation.js';
import { getOpenMessage, getCloseMessage, getPathMessage } from './getMessages.js';

process.chdir(homedir());

const runFileManager = async () => {

  const username = getNameOfUser();
  const openMessage = getOpenMessage(username);
  const closeMessage = getCloseMessage(username);

  process.stdout.write(openMessage);
  process.stdout.write(getPathMessage());

  const rl = readline.createInterface(process.stdin, process.stdout);

  rl.on('line', async (data) => {
    if (data === '.exit') {
      rl.close();
    } else {
      const input = data
        ? data.match(/(?:[^\s'"]+|'[^']*'|"[^"]*")+/g).map((args) => args.replace(/['"]/g, ''))
        : [];
      const command = input[0];
      const args = input.slice(1);

      await startOperation(command, args);
      process.stdout.write(getPathMessage());
    }
  });

  rl.on('close', () => process.stdout.write(closeMessage));

}

await runFileManager();
