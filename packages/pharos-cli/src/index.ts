#!/usr/bin/env node
import colors from 'colors';
import { Command } from 'commander';
import createPharosComponent from './cmds/pharos-component';

const program = new Command();

program
  .version('0.0.1', '-v, --VERSION')
  .command('component <component>')
  .alias('wc')
  .description('Creates a shell pharos web component')
  .allowUnknownOption(false)
  .action((component) => {
    createPharosComponent(component).catch((error) => {
      console.error(error);
    });
  });

program.addHelpText(
  'after',
  `
  \nExamples:
  ${colors.bold('\nWeb Component')}
  $ pharos component|wc button
  \n`
);

if (process.argv.length < 3) {
  console.error(colors.red('\nNo command given!\n'));
  program.help();
}

program.parse(process.argv);
