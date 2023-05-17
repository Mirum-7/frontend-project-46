import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'node:path';
import genDiff from '../src/index.js';
import { genDiffJsonResult, genDiffPlainResult, genDiffStylishResult } from '../__fixtures__/sources.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  { format: 'stylish', expected: genDiffStylishResult },
  { format: 'plain', expected: genDiffPlainResult },
  { format: 'json', expected: genDiffJsonResult },
])('check $format format', ({ format, expected }) => {
  expect(genDiff(getFixturePath('./json/file1.json'), getFixturePath('./yaml/file2.yaml'), format)).toEqual(expected);
});
