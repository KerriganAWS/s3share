import * as yargs from 'yargs';

async function main() {
  const ya = yargs;
  ya.commandDir('cmds');
  ya.recommendCommands();
  ya.strictCommands();
  ya.wrap(yargs.terminalWidth());
  ya.version(false);
  ya.help();

  const args = ya.argv;

  if (args.debug) process.env.DEBUG = 'true';
}

main().catch(e => {
  console.error(e.stack);
  process.exit(1);
});
