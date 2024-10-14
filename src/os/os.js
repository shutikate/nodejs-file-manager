import { EOL, cpus, homedir, userInfo } from 'node:os';
import { handleError, inputError } from '../getMessages.js';

export const printOSInformation = async (args) => {

  try {
    if (args.length !== 1) {
      console.error(inputError);
      return;
    }

    const arg = args.join('').replace('--', '');
    switch (arg) {
      case 'EOL':
        console.log(EOL);
        break;
      case 'cpus':
        const cpuInfo = cpus();
        console.log(`Overall amount of CPUS: ${cpuInfo.length}`);
        cpuInfo.forEach((cpu) => console.log(`${cpu.model} : ${(cpu.speed / 1000).toFixed(2)} GHz`));
        break;
      case 'homedir':
        console.log(homedir());
        break;
      case 'username':
        console.log(userInfo().username);
        break;
      case 'architecture':
        console.log(process.arch);
        break;
    }
  }
  catch (error) {
    handleError(error);
  }
}
