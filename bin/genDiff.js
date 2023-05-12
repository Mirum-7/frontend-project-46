#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('genDiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((path1, path2, options) => {
    console.log(genDiff(path1, path2, options.format));
  });

program.parse(process.argv);
