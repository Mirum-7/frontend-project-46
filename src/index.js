import Path from 'node:path';
import { readFileSync } from 'node:fs';
import parse from './parser.js';
import format from './formatters/index.js';
import compare from './compare.js';

const genDiff = (path1, path2, formatType = 'stylish') => {
  const data1 = readFileSync(Path.resolve(path1), 'utf-8');
  const data2 = readFileSync(Path.resolve(path2), 'utf-8');

  const ext1 = Path.extname(path1).split('.')[1]; // Игорь сказал нужно расширение без точки получить
  const ext2 = Path.extname(path2).split('.')[1]; // Поэтому я написал другой вариант

  const obj1 = parse(data1, ext1);
  const obj2 = parse(data2, ext2);

  const tree = compare(obj1, obj2);

  return format(tree, formatType);
};

export default genDiff;
