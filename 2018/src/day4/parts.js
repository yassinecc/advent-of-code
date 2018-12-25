const sortBy = require('lodash/sortBy');
const { findRegex } = require('../../utils/common');

const sortTimeEntries = entriesList => {
  return sortBy(entriesList, entry => {
    return extractDateFromEntry(entry);
  });
};

const extractDateFromEntry = entry => findRegex(entry, /\[(.*?)\]/);

const part1 = () => {
  return 0;
};
const part2 = () => {
  return 0;
};
module.exports = { extractDateFromEntry, part1, part2 };
