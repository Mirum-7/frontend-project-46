import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff, { getUnionKeys, readFrom } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let fileName;

let obj1;
let obj2;

beforeAll(() => {
  fileName = 'file.json';
});

beforeEach(() => {
  obj1 = {
    1: 'line 1',
    2: 'line 2',
    line1: 'some text',
    line2: 'text',
  };

  obj2 = {
    1: 'line 1',
    3: 'line 3',
    line1: 'too some text',
    line2: 'text',
    line3: 'some text',
  };
});

describe('work with file', () => {
  test('Read file', () => {
    const content = readFrom(getFixturePath(fileName));

    expect(content).toEqual(`{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}`);
  });
});

describe('work with object', () => {
  test('getUnionKeys', () => {
    expect(getUnionKeys(obj1, obj2)).toEqual(['1', '2', '3', 'line1', 'line2', 'line3']);

    obj2 = [];

    expect(getUnionKeys(obj1, obj2)).toEqual(['1', '2', 'line1', 'line2']); // один элемент пустой

    obj1 = [];

    expect(getUnionKeys(obj1, obj2)).toEqual([]); // все пустые
  });

  test('genDiff', () => {
    expect(genDiff(obj1, obj2)).toEqual({
      1: {
        first: 'line 1',
        second: 'line 1',
      },
      2: {
        first: 'line 2',
      },
      3: {
        second: 'line 3',
      },
      line1: {
        first: 'some text',
        second: 'too some text',
      },
      line2: {
        first: 'text',
        second: 'text',
      },
      line3: {
        second: 'some text',
      },
    });
  });
});
