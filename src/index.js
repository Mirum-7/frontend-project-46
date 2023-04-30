import { readFileSync } from 'node:fs';
import { program } from 'commander';
import Path from 'node:path';
import _ from 'lodash';
// import  { Command } from 'commander';
// const program = new Command;
// Я увидел такой вариант в доках

export const readFrom = (path) => readFileSync(Path.resolve(path), 'utf-8');

export const getUnionKeys = (...objects) => _.union(...objects.map(Object.keys)).sort();

const genDiff = (filePath1, filePath2) => {
  const contentFile1 = readFrom(filePath1);
  const contentFile2 = readFrom(filePath2);

  const obj1 = JSON.parse(contentFile1);
  const obj2 = JSON.parse(contentFile2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const keys = _.union(keys1, keys2).sort();

  const sep = '   ';
  const f1Sep = ' - ';
  const f2Sep = ' + ';

  const lines = keys.map((key) => {
    if (obj1[key] === obj2[key]) {
      return [`${sep}${key}:${obj1[key]}`];
    }

    const result = [];

    if (obj1.hasOwnProperty(key)) {
      result.push(`${f1Sep}${key}:${obj1[key]}`);
    }
    if (obj2.hasOwnProperty(key)) {
      result.push(`${f2Sep}${key}:${obj2[key]}`);
    }

    return result;
  }).flat();

  const str = `{\n${lines.join(',\n')}\n}`;

  console.log(str);
};

export const startGenDiffCommand = () => {
  program
    .name('genDiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0');

  program
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action(genDiff);

  program.parse(process.argv);
};

export default genDiff;
