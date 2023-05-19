import _ from 'lodash';

const DEFAULT_SEP = '    ';

export const stringify = (obj, deep = 0) => {
  if (!_.isObject(obj)) {
    return `${obj}`;
  }

  const stringifiedElements = Object.entries(obj).map(([key, value]) => `${DEFAULT_SEP.repeat(deep + 1)}${key}: ${stringify(value, deep + 1)}`).join('\n');

  return `{\n${stringifiedElements}\n${DEFAULT_SEP.repeat(deep)}}`;
};

const stylish = (tree) => {
  const deletedSep = '  - ';
  const addedSep = '  + ';

  const iter = (list, deep) => {
    const text = list
      .flatMap((el) => {
        switch (el.type) {
          case 'tree':
            return `${DEFAULT_SEP.repeat(deep)}${el.key}: {\n${iter(el.children, deep + 1)}\n${DEFAULT_SEP.repeat(deep)}}`;
          case 'equal':
            return `${DEFAULT_SEP.repeat(deep)}${el.key}: ${el.value}`;
          case 'added':
            return `${DEFAULT_SEP.repeat(deep - 1)}${addedSep}${el.key}: ${stringify(el.value2, deep)}`;
          case 'deleted':
            return `${DEFAULT_SEP.repeat(deep - 1)}${deletedSep}${el.key}: ${stringify(el.value1, deep)}`;
          case 'changed':
            return `${DEFAULT_SEP.repeat(deep - 1)}${deletedSep}${el.key}: ${stringify(el.value1, deep)}\n${DEFAULT_SEP.repeat(deep - 1)}${addedSep}${el.key}: ${stringify(el.value2, deep)}`;
          default:
            throw new Error(`unknown element type: ${el.type}`);
        }
      }, []).join('\n');

    return text;
  };

  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
