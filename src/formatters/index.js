import stylish from './stylish.js';

const getFormatter = (format) => {
  if (format === 'stylish') {
    return stylish;
  }
  throw new Error('Unknown format');
};

export default getFormatter;
