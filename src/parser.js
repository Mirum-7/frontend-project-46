import yaml from 'js-yaml';
import Path from 'node:path';
import { readFileSync } from 'node:fs';

const parse = (path) => {
  const extension = Path.extname(path);
  const data = readFileSync(Path.resolve(path), 'utf-8');

  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error('Unknown file extension');
  }
};

export default parse;
