export const tree = [
  {
    key: 'common',
    type: 'tree',
    children: [
      {
        key: 'follow',
        type: 'added',
        value2: false,
      },
      {
        key: 'setting1',
        type: 'equal',
        value: 'Value 1',
      },
      {
        key: 'setting2',
        type: 'deleted',
        value1: 200,
      },
      {
        key: 'setting3',
        type: 'changed',
        value1: true,
        value2: null,
      },
      {
        key: 'setting4',
        type: 'added',
        value2: 'blah blah',
      },
      {
        key: 'setting5',
        type: 'added',
        value2: {
          key5: 'value5',
        },
      },
      {
        key: 'setting6',
        type: 'tree',
        children: [
          {
            key: 'doge',
            type: 'tree',
            children: [
              {
                key: 'wow',
                type: 'changed',
                value1: '',
                value2: 'so much',
              },
            ],
          },
          {
            key: 'key',
            type: 'equal',
            value: 'value',
          },
          {
            key: 'ops',
            type: 'added',
            value2: 'vops',
          },
        ],
      },
    ],
  },
  {
    key: 'group1',
    type: 'tree',
    children: [
      {
        key: 'baz',
        type: 'changed',
        value1: 'bas',
        value2: 'bars',
      },
      {
        key: 'foo',
        type: 'equal',
        value: 'bar',
      },
      {
        key: 'nest',
        type: 'changed',
        value1: {
          key: 'value',
        },
        value2: 'str',
      },
    ],
  },
  {
    key: 'group2',
    type: 'deleted',
    value1: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  },
  {
    key: 'group3',
    type: 'added',
    value2: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  },
];

export const genDiffPlainResult = `\
Property 'common.follow' was added with value: false
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

export const genDiffStylishResult = `{
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

export const genDiffJsonResult = '[{"key":"common","children":[{"key":"follow","value2":false,"type":"added"},{"key":"setting1","value":"Value 1","type":"equal"},{"key":"setting2","value1":200,"type":"deleted"},{"key":"setting3","value1":true,"value2":null,"type":"changed"},{"key":"setting4","value2":"blah blah","type":"added"},{"key":"setting5","value2":{"key5":"value5"},"type":"added"},{"key":"setting6","children":[{"key":"doge","children":[{"key":"wow","value1":"","value2":"so much","type":"changed"}],"type":"tree"},{"key":"key","value":"value","type":"equal"},{"key":"ops","value2":"vops","type":"added"}],"type":"tree"}],"type":"tree"},{"key":"group1","children":[{"key":"baz","value1":"bas","value2":"bars","type":"changed"},{"key":"foo","value":"bar","type":"equal"},{"key":"nest","value1":{"key":"value"},"value2":"str","type":"changed"}],"type":"tree"},{"key":"group2","value1":{"abc":12345,"deep":{"id":45}},"type":"deleted"},{"key":"group3","value2":{"deep":{"id":{"number":45}},"fee":100500},"type":"added"}]';

export const objToStringify = {
  key1: 1,
  key2: 'value1',
  tree: {
    key1: 'some text',
    treeInTree: {
      key12: 1,
    },
    str: 'text',
  },
  tree2: {
    num: 123,
  },
  key52: 12,
};

export const objToCompare1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

export const objToCompare2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

export const stringifyResult1 = `\
{
    key1: 1
    key2: value1
    tree: {
        key1: some text
        treeInTree: {
            key12: 1
        }
        str: text
    }
    tree2: {
        num: 123
    }
    key52: 12
}`;

export const stringifyResult2 = `\
{
--key1: 1
--key2: value1
--tree: {
----key1: some text
----treeInTree: {
------key12: 1
----}
----str: text
--}
--tree2: {
----num: 123
--}
--key52: 12
}`;

export const jsonData = `\
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}`;

export const yamlData = `\
---
host: hexlet.io
timeout: 50
proxy: 123.234.53.22
follow: false
`;

export const parserResult = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

export const treeToErrorFormatter = [
  {
    key: 'key',
    type: 'error',
  },
];
