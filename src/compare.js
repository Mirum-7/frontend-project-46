import _ from 'lodash';

export const getUnionKeys = (object1, object2) => _.sortBy(_
  .union(Object.keys(object1), Object.keys(object2)));

const compare = (obj1, obj2) => {
  const keys = getUnionKeys(obj1, obj2);

  const tree = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        key,
        children: compare(obj1[key], obj2[key]),
        type: 'tree',
      };
    }

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return {
        key,
        value1: obj1[key],
        type: 'deleted',
      };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return {
        key,
        value2: obj2[key],
        type: 'added',
      };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key,
        value1: obj1[key],
        value2: obj2[key],
        type: 'changed',
      };
    }
    return {
      key,
      value: obj1[key],
      type: 'equal',
    };
  }, {});

  return tree;
};

export default compare;
