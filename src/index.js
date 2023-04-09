import { Command } from 'commander';

export const startGenDiffCommand = () => {
  const program = new Command();

  program
    .name('genDiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0');
  
  program
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>')
    .argument('<filepath2>');

  program.parse();
}

const genDiff = () => {

}

export default genDiff;