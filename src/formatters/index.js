import plain from './plain.js';
import stylish from './stylish.js';

const format = (tree, type) => {
  switch (type) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`Unknown format: ${type}`);
  }
};

export default format;
