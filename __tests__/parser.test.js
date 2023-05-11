import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import parse from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let jsonFileName;
let yamlFileName;
let txtFileName;
let obj;

beforeAll(() => {
  jsonFileName = 'file.json';
  yamlFileName = 'file.yaml';
  txtFileName = 'file.txt';
  obj = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
});

test('json file', () => {
  const content = parse(getFixturePath(jsonFileName));

  expect(content).toEqual(obj); // json file
});

test('yaml file', () => {
  const content = parse(getFixturePath(yamlFileName));

  expect(content).toEqual(obj); // yaml file
});

test('other file(error massage)', () => {
  expect(() => {
    parse(getFixturePath(txtFileName));
  }).toThrow(); // other file
});
