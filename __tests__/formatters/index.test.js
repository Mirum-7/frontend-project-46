import getFormatter from '../../src/formatters';
import plain from '../../src/formatters/plain';
import stylish from '../../src/formatters/stylish';

test('chose formatter', () => {
  expect(getFormatter('stylish')).toEqual(stylish);
  expect(getFormatter('plain')).toEqual(plain);
  expect(getFormatter('json')).toEqual(JSON.stringify);
});

test('error massage', () => {
  expect(() => {
    getFormatter('other');
  }).toThrow();
});
