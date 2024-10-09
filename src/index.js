import { fileURLToPath } from 'node:url';
import readline from 'node:readline/promises';
import { EOL, homedir } from 'node:os';

const getNameOfUser = () => {
  const passedArgs = process.argv.slice(2);
  const usernameArg = passedArgs.find((arg) => arg.startsWith('--username='));
  if (usernameArg) {
    const name = usernameArg.split('=')[1];
    return name;
  };
}

const runFileManager = async () => {

  const username = getNameOfUser();
  const greetingMessage = `Welcome to the File Manager, ${username}!`;
  const closeMessage = `Thank you for using File Manager, ${username}, goodbye!`;
  process.stdout.write(`${greetingMessage}${EOL}${EOL}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.setPrompt(`You are currently in ${homedir}${EOL}`);
  rl.prompt();
  rl.on('line', (data) => {
    if (data.toString() === '.exit') {
      rl.close();
    } else {
      rl.prompt();
    }
  });
  rl.on('close', () => process.stdout.write(`${closeMessage}${EOL}`));

}

await runFileManager();