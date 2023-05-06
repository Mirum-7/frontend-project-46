import { program } from 'commander';
import _ from 'lodash';
import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import Path from 'node:path';
// import  { Command } from 'commander';
// const program = new Command();
// Я увидел такой вариант в доках
export const getUnionKeys = (...objects) => _.union(...objects.map(Object.keys)).sort();

export const parse = (path) => {
  const extension = Path.extname(path);
  const data = readFileSync(Path.resolve(path), 'utf-8');

  if (extension === '.json') {
    return JSON.parse(data);
  }
  if (extension === '.yaml' || extension === '.yml') {
    return yaml.load(data);
  }
  throw new Error('Unknown file extension');
};

const genDiff = (obj1, obj2) => {
  const keys = getUnionKeys(obj1, obj2);

  return keys.reduce((result, key) => {
    const values = {};

    if (obj1.hasOwnProperty(key)) {
      values.first = obj1[key];
    }

    if (obj2.hasOwnProperty(key)) {
      values.second = obj2[key];
    }

    return { ...result, [key]: values };
  }, {});
};

export const printDiff = (obj) => {
  const sep = '   ';
  const f1sep = ' - ';
  const f2sep = ' + ';

  const text = Object.entries(obj).reduce((lines, [key, value]) => {
    if (value.first === value.second) {
      return [...lines, `${sep}${key}: ${value.first}`];
    }

    const result = [];

    if (value.hasOwnProperty('first')) {
      result.push(`${f1sep}${key}: ${value.first}`);
    }

    if (value.hasOwnProperty('second')) {
      result.push(`${f2sep}${key}: ${value.second}`);
    }

    return [...lines, ...result];
  }, []).join(',\n');

  return `{\n${text}\n}`;
};

export const compareFiles = (path1, path2) => {
  const obj1 = parse(path1);
  const obj2 = parse(path2);

  const comparedObj = genDiff(obj1, obj2);

  console.log(printDiff(comparedObj));
};

export const runGenDiffCommand = () => {
  program
    .name('genDiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0');

  program
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action(compareFiles);

  program.parse(process.argv);
};

export default genDiff;
