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

export const createObjPath = (...paths) => paths.filter((el) => el !== '').join('.');

const plain = (tree) => {
  const iter = (list, path = '') => {
    const text = list
      .filter((el) => !el.hasOwnProperty('value'))
      .flatMap((el) => {
        const fullPath = createObjPath(path, el.key);
        if (el.hasOwnProperty('children')) {
          return iter(el.children, fullPath);
        }
        if (el.hasOwnProperty('value1')) {
          if (el.hasOwnProperty('value2')) {
            return `Property '${fullPath}' was updated. From ${createValue(el.value1)} to ${createValue(el.value2)}`;
          }
          return `Property '${fullPath}' was removed`;
        }
        return `Property '${fullPath}' was added with value: ${createValue(el.value2)}`;
      });
    return text;
  };

  return iter(tree).join('\n');
};

export default plain;
