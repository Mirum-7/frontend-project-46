import plain, { createObjPath, createValue } from '../../src/formatters/plain';

let comparedObj;

let genDiffPlainResult;

beforeAll(() => {
  comparedObj = [
    {
      key: 'common',
      children: [
        {
          key: 'follow',
          value2: false,
        },
        {
          key: 'setting1',
          value: 'Value 1',
        },
        {
          key: 'setting2',
          value1: 200,
        },
        {
          key: 'setting3',
          value1: true,
          value2: null,
        },
        {
          key: 'setting4',
          value2: 'blah blah',
        },
        {
          key: 'setting5',
          value2: {
            key5: 'value5',
          },
        },
        {
          key: 'setting6',
          children: [
            {
              key: 'doge',
              children: [
                {
                  key: 'wow',
                  value1: '',
                  value2: 'so much',
                },
              ],
            },
            {
              key: 'key',
              value: 'value',
            },
            {
              key: 'ops',
              value2: 'vops',
            },
          ],
        },
      ],
    },
    {
      key: 'group1',
      children: [
        {
          key: 'baz',
          value1: 'bas',
          value2: 'bars',
        },
        {
          key: 'foo',
          value: 'bar',
        },
        {
          key: 'nest',
          value1: {
            key: 'value',
          },
          value2: 'str',
        },
      ],
    },
    {
      key: 'group2',
      value1: {
        abc: 12345,
        deep: {
          id: 45,
        },
      },
    },
    {
      key: 'group3',
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
  expect(createObjPath('key', '', 'key2', '', 'key3.key4', 'key5')).toEqual('key.key2.key3.key4.key5');
});

test('updateValueIfObject', () => {
  expect(createValue({ key: 123 })).toEqual('[complex value]');

  expect(createValue('123')).toEqual("'123'");

  expect(createValue(123)).toEqual(123);

  expect(createValue(true)).toEqual(true);
});

test('plain', () => {
  expect(plain(comparedObj)).toEqual(genDiffPlainResult);
});
