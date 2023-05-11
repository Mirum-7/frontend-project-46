import getFormatter from '../../src/formatters';
import plain from '../../src/formatters/plain';
import stylish from '../../src/formatters/stylish';

test('chose stylish formatter', () => {
  expect(getFormatter('stylish')).toEqual(stylish);
  expect(getFormatter('plain')).toEqual(plain);
});

test('error massage', () => {
  expect(() => {
    getFormatter('other');
  }).toThrow();
});
