import plain from './plain.js';
import stylish from './stylish.js';

const getFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    default:
      throw new Error('Unknown format');
  }
};

export default getFormatter;
