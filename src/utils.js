export const getNameOfUser = () => {
  const passedArgs = process.argv.slice(2);
  const usernameArg = passedArgs.find((arg) => arg.startsWith('--username='));
  if (usernameArg) {
    const name = usernameArg.split('=')[1];
    return name;
  };
}
