import plain, { createObjPath, createValue } from '../../src/formatters/plain';
import { tree, genDiffPlainResult } from '../../__fixtures__/sources';

test('create path', () => {
  expect(createObjPath('key', 'key5')).toEqual('key.key5');
  expect(createObjPath('', 'key5')).toEqual('key5');
});

test('updateValueIfObject', () => {
  expect(createValue({ key: 123 })).toEqual('[complex value]');

  expect(createValue('123')).toEqual("'123'");

  expect(createValue(123)).toEqual(123);

  expect(createValue(true)).toEqual(true);
});

test('plain', () => {
  expect(plain(tree)).toEqual(genDiffPlainResult);
});
