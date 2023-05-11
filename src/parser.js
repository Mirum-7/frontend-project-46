import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import Path from 'node:path';

const parse = (path) => {
  const extension = Path.extname(path);
  const data = readFileSync(Path.resolve(path), 'utf-8');

  if (extension === '.json') {
    return JSON.parse(data);
  }
  if (extension === '.yaml' || extension === '.yml') {
    return yaml.load(data);
  }
  throw new Error('Unknown file extension');
};

export default parse;
