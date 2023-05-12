import _ from 'lodash';

export const getUnionKeys = (object1, object2) => _.union(...[object1, object2].map(Object.keys));

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

export default compare;
