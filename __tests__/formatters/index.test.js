import getFormatter from '../../src/formatters';
import stylish from '../../src/formatters/stylish';

test('chose stylish formatter', () => {
  expect(getFormatter('stylish')).toEqual(stylish);
});

test('error massage', () => {
  expect(() => {
    getFormatter('other');
  }).toThrow();
});
