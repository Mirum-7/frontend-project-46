import parse from '../src/parser.js';

const jsonData = `{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}`;
const yamlData = `---
host: hexlet.io
timeout: 50
proxy: 123.234.53.22
follow: false
`;
const obj = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

test('json file', () => {
  const content = parse(jsonData, '.json');

  expect(content).toEqual(obj); // json file
});

test('yaml file', () => {
  const content = parse(yamlData, '.yaml');

  expect(content).toEqual(obj); // yaml file
});

test('other file(error massage)', () => {
  expect(() => {
    parse('key: value', '.txt');
  }).toThrow(); // other file
});
