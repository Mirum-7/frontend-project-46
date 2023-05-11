import _ from 'lodash';

const stringify = (obj, sep = '    ', deep = 0) => {
  if (!_.isObject(obj)) {
    return `${obj}`;
  }

  const stringifiedElements = Object.entries(obj).map(([key, value]) => `${sep.repeat(deep + 1)}${key}: ${stringify(value, sep, deep + 1)}`).join('\n');

  return `{\n${stringifiedElements}\n${sep.repeat(deep)}}`;
};

export default stringify;
