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

beforeAll(() => {
  jsonFileName = 'file.json';
  yamlFileName = 'file.yaml';
  txtFileName = 'file.txt';
});

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

  expect(() => { parse(getFixturePath(txtFileName)); }).toThrow(); // other file
});
