import { program } from 'commander';
import _ from 'lodash';
import parse from './parser.js';
import stylish from './formatters/stylish.js';
// import  { Command } from 'commander';
// const program = new Command();
// Я увидел такой вариант в доках
export const getUnionKeys = (...objects) => _.union(...objects.map(Object.keys)).sort();

export const compareObjects = (obj1, obj2) => {
  const keys = getUnionKeys(obj1, obj2);

  const tree = keys.map((key) => {
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

  return tree;
};

const genDiff = (path1, path2, options) => {
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
