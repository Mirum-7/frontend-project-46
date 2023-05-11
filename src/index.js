import { program } from 'commander';
import _ from 'lodash';
import parse from './parser.js';
// import  { Command } from 'commander';
// const program = new Command();
// Я увидел такой вариант в доках
export const getUnionKeys = (...objects) => _.union(...objects.map(Object.keys)).sort();

export const compareObjects = (obj1, obj2) => {
  const keys = getUnionKeys(obj1, obj2);

  const result = keys.map((key) => {
    const obj = { key };

    if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
      obj.children = compareObjects(obj1[key], obj2[key]);
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

export const stylish = (obj) => { // говнокод
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

const genDiff = (path1, path2, options = { format: 'stylish' }) => {
  const obj1 = parse(path1);
  const obj2 = parse(path2);

  const comparedObj = compareObjects(obj1, obj2);

  let result;

  if (options.format === 'stylish') {
    result = stylish(comparedObj);
  }

  return result;
};

export const runGenDiffCommand = () => {
  program
    .name('genDiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0');

  program
    .option('-f, --format <type>', 'output format', 'stylish')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((path1, path2, options) => { console.log(genDiff(path1, path2, options)); });

  program.parse(process.argv);
};

export default genDiff;
