import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'node:path';
import genDiff, {
  compareObjects,
  getUnionKeys,
} from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let obj1;
let obj2;

let comparedObj;

let genDiffStylishResult;
let genDiffPlainResult;

beforeAll(() => {
  obj1 = {
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

  obj2 = {
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

test('getUnionKeys', () => {
  expect(getUnionKeys(obj1, obj2)).toEqual(['common', 'group1', 'group2', 'group3']);
});

test('compareObjects', () => {
  expect(compareObjects(obj1, obj2)).toEqual(comparedObj);
});

describe('genDiff', () => {
  test('default formatter(stylish)', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml')))
      .toEqual(genDiffStylishResult);
  });
  test('plain formatter', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), 'plain'))
      .toEqual(genDiffPlainResult);
  });
});
