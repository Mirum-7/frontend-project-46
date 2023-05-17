import _ from 'lodash';

export const stringify = (obj, sep = '    ', deep = 0) => {
  if (!_.isObject(obj)) {
    return `${obj}`;
  }

  const stringifiedElements = Object.entries(obj).map(([key, value]) => `${sep.repeat(deep + 1)}${key}: ${stringify(value, sep, deep + 1)}`).join('\n');

  return `{\n${stringifiedElements}\n${sep.repeat(deep)}}`;
};

const stylish = (tree) => {
  const sep = '    ';
  const f1sep = '  - ';
  const f2sep = '  + ';

  const iter = (list, deep) => {
    const text = list
      .flatMap((el) => {
        switch (el.type) {
          case 'tree':
            return `${sep.repeat(deep)}${el.key}: {\n${iter(el.children, deep + 1)}\n${sep.repeat(deep)}}`;
          case 'equal':
            return `${sep.repeat(deep)}${el.key}: ${el.value}`;
          case 'added':
            return `${sep.repeat(deep - 1)}${f2sep}${el.key}: ${stringify(el.value2, sep, deep)}`;
          case 'deleted':
            return `${sep.repeat(deep - 1)}${f1sep}${el.key}: ${stringify(el.value1, sep, deep)}`;
          case 'changed':
            return `${sep.repeat(deep - 1)}${f1sep}${el.key}: ${stringify(el.value1, sep, deep)}\n${sep.repeat(deep - 1)}${f2sep}${el.key}: ${stringify(el.value2, sep, deep)}`;
          default:
            throw new Error(`unknown element type: ${el.type}`);
        }
      }, [])
      .join('\n');

    return text;
  };

  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
