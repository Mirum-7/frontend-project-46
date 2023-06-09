import _ from 'lodash';

export const createValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

export const createObjPath = (path1, path2) => [path1, path2].filter((el) => el !== '').join('.');

const plain = (tree) => {
  const iter = (list, path = '') => {
    const text = list
      .filter((el) => el.type !== 'equal')
      .flatMap((el) => {
        const fullPath = createObjPath(path, el.key);
        switch (el.type) {
          case 'added':
            return `Property '${fullPath}' was added with value: ${createValue(el.value2)}`;
          case 'deleted':
            return `Property '${fullPath}' was removed`;
          case 'tree':
            return iter(el.children, fullPath);
          case 'changed':
            return `Property '${fullPath}' was updated. From ${createValue(el.value1)} to ${createValue(el.value2)}`;
          default:
            throw new Error(`unknown element type: ${el.type}`);
        }
      });
    return text;
  };

  return iter(tree).join('\n');
};

export default plain;
