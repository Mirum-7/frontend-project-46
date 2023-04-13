import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFrom, getUnionKeys } from '../src/index.js';

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
  test('get sorted union of keys', () => {
    expect(getUnionKeys(obj1, obj2)).toEqual(['1', '2', '3', 'line1', 'line2', 'line3']);

    obj2 = [];

    expect(getUnionKeys(obj1, obj2)).toEqual(['1', '2', 'line1', 'line2']); // один элемент пустой

    obj1 = [];

    expect(getUnionKeys(obj1, obj2)).toEqual([]); // все пустые
  });
});
