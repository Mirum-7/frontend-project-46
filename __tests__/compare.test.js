import compare, { getUnionKeys } from '../src/compare';

const obj1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};
const obj2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

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

test('getUnionKeys', () => {
  expect(getUnionKeys(obj1, obj2)).toEqual([
    'common',
    'group1',
    'group2',
    'group3',
  ]);
});

test('compareObjects', () => {
  expect(compare(obj1, obj2)).toEqual(tree);
});
