import stylish from '../src/formatters/stylish';

let comparedObj;

let genDiffStylishResult;

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

  genDiffStylishResult = `{
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
});

test('stylish', () => {
  expect(stylish(comparedObj)).toEqual(genDiffStylishResult);
});
