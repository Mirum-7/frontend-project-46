import plain, { createObjPath, createValue } from '../../src/formatters/plain';

let tree;

let genDiffPlainResult;

beforeAll(() => {
  tree = [
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

  genDiffPlainResult = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
});

test('create path', () => {
  expect(createObjPath('key', 'key5')).toEqual('key.key5');
  expect(createObjPath('', 'key5')).toEqual('key5');
});

test('updateValueIfObject', () => {
  expect(createValue({ key: 123 })).toEqual('[complex value]');

  expect(createValue('123')).toEqual("'123'");

  expect(createValue(123)).toEqual(123);

  expect(createValue(true)).toEqual(true);
});

test('plain', () => {
  expect(plain(tree)).toEqual(genDiffPlainResult);
});
