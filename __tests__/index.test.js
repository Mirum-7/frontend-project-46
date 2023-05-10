import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff, { getUnionKeys, parse, printDiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let jsonFileName;
let yamlFileName;

let obj1;
let obj2;

let genDiffObj;

beforeAll(() => {
  jsonFileName = 'file.json';
  yamlFileName = 'file.yaml';

  genDiffObj = [
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
});

beforeEach(() => {
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
});

describe('work with file', () => {
  test('parse file', () => {
    let content = parse(getFixturePath(jsonFileName));
    const result = {
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    };

    expect(content).toEqual(result); // json file

    content = parse(getFixturePath(yamlFileName));

    expect(content).toEqual(result); // yaml file
  });
});

describe('work with object', () => {
  test('getUnionKeys', () => {
    expect(getUnionKeys(obj1, obj2)).toEqual(['common', 'group1', 'group2', 'group3']);
  });

  test('genDiff', () => {
    expect(genDiff(obj1, obj2)).toEqual(genDiffObj);
  });

  test('printDiff', () => {
    console.log(printDiff(genDiffObj));
    expect(printDiff(genDiffObj)).toEqual(`{
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
}`);
  });
});
