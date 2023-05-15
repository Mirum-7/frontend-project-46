import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'node:path';
import genDiff from '../src/index.js';
import { genDiffJsonResult, genDiffPlainResult, genDiffStylishResult } from '../__fixtures__/sources.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('genDiff', () => {
  test('default formatter(stylish)', () => {
    expect(genDiff(getFixturePath('json/file1.json'), getFixturePath('yaml/file2.yaml')))
      .toEqual(genDiffStylishResult);
  });
  test('plain formatter', () => {
    expect(genDiff(getFixturePath('json/file1.json'), getFixturePath('yaml/file2.yaml'), 'plain'))
      .toEqual(genDiffPlainResult);
  });
  test('json formatter', () => {
    expect(genDiff(getFixturePath('json/file1.json'), getFixturePath('yaml/file2.yaml'), 'json'))
      .toEqual(genDiffJsonResult);
  });
});
