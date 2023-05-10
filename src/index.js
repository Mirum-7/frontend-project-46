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

  const result = keys.map((key) => {
    const obj = { key };

    if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
      obj.children = genDiff(obj1[key], obj2[key]);
      return obj;
    }

    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] === obj2[key]) {
      obj.value = obj1[key];
      return obj;
    }
    if (obj1.hasOwnProperty(key)) {
      obj.value1 = obj1[key];
    }
    if (obj2.hasOwnProperty(key)) {
      obj.value2 = obj2[key];
    }
    return obj;
  }, {});

  return result;
};

export const printDiff = (obj) => {
  const sep = '    ';
  const f1sep = '  - ';
  const f2sep = '  + ';

  const printObj = (simpleObj, fileSep, parentKey, deep, firstStart = true) => {
    const textObj = Object.entries(simpleObj).map(([key, value]) => {
      if (value instanceof Object) {
        return `${sep.repeat(deep + 1)}${printObj(value, fileSep, key, deep + 1, false)}`;
      }
      return `${sep.repeat(deep + 1)}${key}: ${value}`;
    }, []).join('\n');

    if (firstStart) {
      return `${sep.repeat(deep - 1)}${fileSep}${parentKey}: {\n${textObj}\n${sep.repeat(deep)}}`;
    }
    return `${parentKey}: {\n${textObj}\n${sep.repeat(deep)}}`;
  };

  const iter = (list, deep) => {
    const text = list.flatMap((el) => {
      if (el.hasOwnProperty('children')) {
        return `${sep.repeat(deep)}${el.key}: {\n${iter(el.children, deep + 1)}\n${sep.repeat(deep)}}`;
      }
      if (el.hasOwnProperty('value')) {
        return `${sep.repeat(deep)}${el.key}: ${el.value}`;
      }

      const difLines = [];
      if (el.hasOwnProperty('value1')) {
        if (el.value1 instanceof Object) {
          difLines.push(printObj(el.value1, f1sep, el.key, deep));
        } else {
          difLines.push(`${sep.repeat(deep - 1)}${f1sep}${el.key}: ${el.value1}`);
        }
      }
      if (el.hasOwnProperty('value2')) {
        if (el.value2 instanceof Object) {
          difLines.push(printObj(el.value2, f2sep, el.key, deep));
        } else {
          difLines.push(`${sep.repeat(deep - 1)}${f2sep}${el.key}: ${el.value2}`);
        }
      }
      return difLines;
    }, []).join('\n');

    return text;
  };

  return `{\n${iter(obj, 1)}\n}`;
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
