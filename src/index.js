import _ from 'lodash';
import Path from 'node:path';
import { readFileSync } from 'node:fs';
import parse from './parser.js';
import getFormatter from './formatters/index.js';

export const getUnionKeys = (object1, object2) => _.union(...[object1, object2].map(Object.keys));

export const compareObjects = (obj1, obj2) => {
  const keys = getUnionKeys(obj1, obj2);

  const tree = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        key,
        children: compareObjects(obj1[key], obj2[key]),
        type: 'tree',
      };
    }

    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return {
          key,
          value: obj1[key],
          type: 'equal',
        };
      }
      return {
        key,
        value1: obj1[key],
        value2: obj2[key],
        type: 'changed',
      };
    }
    if (_.has(obj1, key)) {
      return {
        key,
        value1: obj1[key],
        type: 'deleted',
      };
    }
    return {
      key,
      value2: obj2[key],
      type: 'added',
    };
  }, {});

  return _.sortBy(tree, 'key');
};

const genDiff = (path1, path2, format = 'stylish') => {
  const data1 = readFileSync(Path.resolve(path1), 'utf-8');
  const data2 = readFileSync(Path.resolve(path2), 'utf-8');
  const obj1 = parse(data1, Path.extname(path1));
  const obj2 = parse(data2, Path.extname(path2));

  const comparedObj = compareObjects(obj1, obj2);

  const formatter = getFormatter(format);

  return formatter(comparedObj);
};

export default genDiff;
