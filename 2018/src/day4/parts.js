const sortBy = require('lodash/sortBy');
const moment = require('moment');
const { findRegex } = require('../../utils/common');

const sortTimeEntries = entriesList => sortBy(entriesList, convertDateToTimestamp);

const convertDateToTimestamp = dateString =>
  moment(extractDateFromEntry(dateString), 'YYYY-MM-DD, HH:mm').unix();

const extractDateFromEntry = entry => findRegex(entry, /\[(.*?)\]/);

const part1 = () => {
  return 0;
};
const part2 = () => {
  return 0;
};
module.exports = { extractDateFromEntry, sortTimeEntries, part1, part2 };
