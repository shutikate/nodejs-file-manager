import readline from 'node:readline/promises';
import { EOL } from 'node:os';

const getNameOfUser = () => {
  const passedArgs = process.argv.slice(2);
  const usernameArg = passedArgs.find((arg) => arg.startsWith('--username='));
  if (usernameArg) {
    const name = usernameArg.split('=')[1];
    return name;
  };
}

const runFileManager = async () => {

  const greetingMessage = `Welcome to the File Manager, ${getNameOfUser()}!`
  process.stdout.write(`${greetingMessage}${EOL}${EOL}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

}

await runFileManager();