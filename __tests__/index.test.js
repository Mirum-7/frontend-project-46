import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'node:path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const genDiffStylishResult = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
const genDiffPlainResult = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
const genDiffJsonResult = '[{"key":"common","children":[{"key":"follow","value2":false,"type":"added"},{"key":"setting1","value":"Value 1","type":"equal"},{"key":"setting2","value1":200,"type":"deleted"},{"key":"setting3","value1":true,"value2":null,"type":"changed"},{"key":"setting4","value2":"blah blah","type":"added"},{"key":"setting5","value2":{"key5":"value5"},"type":"added"},{"key":"setting6","children":[{"key":"doge","children":[{"key":"wow","value1":"","value2":"so much","type":"changed"}],"type":"tree"},{"key":"key","value":"value","type":"equal"},{"key":"ops","value2":"vops","type":"added"}],"type":"tree"}],"type":"tree"},{"key":"group1","children":[{"key":"baz","value1":"bas","value2":"bars","type":"changed"},{"key":"foo","value":"bar","type":"equal"},{"key":"nest","value1":{"key":"value"},"value2":"str","type":"changed"}],"type":"tree"},{"key":"group2","value1":{"abc":12345,"deep":{"id":45}},"type":"deleted"},{"key":"group3","value2":{"deep":{"id":{"number":45}},"fee":100500},"type":"added"}]';

describe('genDiff', () => {
  test('default formatter(stylish)', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml')))
      .toEqual(genDiffStylishResult);
  });
  test('plain formatter', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), 'plain'))
      .toEqual(genDiffPlainResult);
  });
  test('json formatter', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yaml'), 'json'))
      .toEqual(genDiffJsonResult);
  });
});
