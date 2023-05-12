import _ from 'lodash';
import parse from './parser.js';
import getFormatter from './formatters/index.js';

export const getUnionKeys = (...objects) => _.union(...objects.map(Object.keys)).sort();

export const compareObjects = (obj1, obj2) => {
  const keys = getUnionKeys(obj1, obj2);

  const tree = keys.map((key) => {
    const obj = { key };

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
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

const genDiff = (path1, path2, format = 'stylish') => {
  const obj1 = parse(path1);
  const obj2 = parse(path2);

  const comparedObj = compareObjects(obj1, obj2);

  const formatter = getFormatter(format);

  return formatter(comparedObj);
};

export default genDiff;
