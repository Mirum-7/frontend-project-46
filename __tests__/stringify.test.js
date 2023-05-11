import stringify from '../src/stringify.js';

let obj;

beforeAll(() => {
  obj = {
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
});

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
