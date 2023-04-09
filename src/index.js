import { Command } from 'commander';

export const startGenDiffCommand = () => {
  const program = new Command();

  program
    .name('genDiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0');

  program.parse();
}

const genDiff = () => {

}

export default genDiff;