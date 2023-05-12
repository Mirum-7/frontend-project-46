import stylish, { stringify } from '../../src/formatters/stylish.js';

const tree = [
  {
    key: 'common',
    type: 'tree',
    children: [
      {
        key: 'follow',
        type: 'added',
        value2: false,
      },
      {
        key: 'setting1',
        type: 'equal',
        value: 'Value 1',
      },
      {
        key: 'setting2',
        type: 'deleted',
        value1: 200,
      },
      {
        key: 'setting3',
        type: 'changed',
        value1: true,
        value2: null,
      },
      {
        key: 'setting4',
        type: 'added',
        value2: 'blah blah',
      },
      {
        key: 'setting5',
        type: 'added',
        value2: {
          key5: 'value5',
        },
      },
      {
        key: 'setting6',
        type: 'tree',
        children: [
          {
            key: 'doge',
            type: 'tree',
            children: [
              {
                key: 'wow',
                type: 'changed',
                value1: '',
                value2: 'so much',
              },
            ],
          },
          {
            key: 'key',
            type: 'equal',
            value: 'value',
          },
          {
            key: 'ops',
            type: 'added',
            value2: 'vops',
          },
        ],
      },
    ],
  },
  {
    key: 'group1',
    type: 'tree',
    children: [
      {
        key: 'baz',
        type: 'changed',
        value1: 'bas',
        value2: 'bars',
      },
      {
        key: 'foo',
        type: 'equal',
        value: 'bar',
      },
      {
        key: 'nest',
        type: 'changed',
        value1: {
          key: 'value',
        },
        value2: 'str',
      },
    ],
  },
  {
    key: 'group2',
    type: 'deleted',
    value1: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  },
  {
    key: 'group3',
    type: 'added',
    value2: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  },
];

const genDiffStylishResult = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

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
