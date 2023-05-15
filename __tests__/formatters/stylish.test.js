import stylish, { stringify } from '../../src/formatters/stylish.js';
import { tree, genDiffStylishResult } from '../../__fixtures__/sources.js';

const obj = {
  key1: 1,
  key2: 'value1',
  tree: {
    key1: 'some text',
    treeInTree: {
      key12: 1,
    },
    str: 'text',
  },
  tree2: {
    num: 123,
  },
  key52: 12,
};

describe('stringify', () => {
  test('default options test', () => {
    expect(stringify(obj)).toEqual(`{
    key1: 1
    key2: value1
    tree: {
        key1: some text
        treeInTree: {
            key12: 1
        }
        str: text
    }
    tree2: {
        num: 123
    }
    key52: 12
}`);
  });

  test('sep test', () => {
    expect(stringify(obj, '--')).toEqual(`{
--key1: 1
--key2: value1
--tree: {
----key1: some text
----treeInTree: {
------key12: 1
----}
----str: text
--}
--tree2: {
----num: 123
--}
--key52: 12
}`);
  });

  test('deep test', () => {
    expect(stringify(obj, '    ', 1)).toEqual(`{
        key1: 1
        key2: value1
        tree: {
            key1: some text
            treeInTree: {
                key12: 1
            }
            str: text
        }
        tree2: {
            num: 123
        }
        key52: 12
    }`);
  });
});

test('stylish', () => {
  expect(stylish(tree)).toEqual(genDiffStylishResult);
});
