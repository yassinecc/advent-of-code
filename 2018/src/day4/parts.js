const { sortBy, range, flow } = require('lodash');
const moment = require('moment');
const { findRegex } = require('../../utils/common');

const sortTimeEntries = entriesList =>
  sortBy(entriesList, flow([extractDateFromEntry, convertDateStringToMoment]));

const convertDateStringToMoment = dateString => moment(dateString, 'YYYY-MM-DD HH:mm');

const extractDateFromEntry = entry => findRegex(entry, /\[(.*?)\]/);

const getSleepingHours = (startTime, endTime) => {
  if (startTime.format('HH') === '23') {
    startTime.add(1, 'day').startOf('day');
  }
  const firstMinuteAsleep = startTime.format('mm');
  const firstMinuteAwake = endTime.format('mm');
  return { [endTime.format('YYYY-MM-DD')]: range(firstMinuteAsleep, firstMinuteAwake) };
};

const part1 = () => {
  return 0;
};
const part2 = () => {
  return 0;
};
module.exports = {
  extractDateFromEntry,
  sortTimeEntries,
  convertDateStringToMoment,
  getSleepingHours,
  part1,
  part2,
};
