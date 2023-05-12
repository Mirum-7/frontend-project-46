import _ from 'lodash';
import Path from 'node:path';
import { readFileSync } from 'node:fs';
import parse from './parser.js';
import getFormatter from './formatters/index.js';
import compare from './compare.js';

const genDiff = (path1, path2, format = 'stylish') => {
  const data1 = readFileSync(Path.resolve(path1), 'utf-8');
  const data2 = readFileSync(Path.resolve(path2), 'utf-8');

  const ext1 = _.last(path1.split('.'));
  const ext2 = _.last(path2.split('.'));

  const obj1 = parse(data1, ext1);
  const obj2 = parse(data2, ext2);

  const comparedObj = compare(obj1, obj2);

  const formatter = getFormatter(format);

  return formatter(comparedObj);
};

export default genDiff;
