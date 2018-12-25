const { sortBy, range, flow, mergeWith, isArray } = require('lodash');
const moment = require('moment');
const { findRegex } = require('../../utils/common');

const extractDateFromEntry = entry => findRegex(entry, /\[(.*?)\]/);

const extractGuardIdFromEntry = entry => findRegex(entry, /#([0-9]*?)\s/);

const convertDateStringToMoment = dateString => moment(dateString, 'YYYY-MM-DD HH:mm');

const getDateFromEntry = flow([extractDateFromEntry, convertDateStringToMoment]);

const sortTimeEntries = entriesList => sortBy(entriesList, getDateFromEntry);

const getSleepingHours = (startTime, endTime) => {
  if (startTime.format('HH') === '23') {
    startTime.add(1, 'day').startOf('day');
  }
  const firstMinuteAsleep = startTime.format('mm');
  const firstMinuteAwake = endTime.format('mm');
  return { [endTime.format('YYYY-MM-DD')]: range(firstMinuteAsleep, firstMinuteAwake) };
};

const customiser = (objValue, srcValue) => {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};

const getGuardSleep = (guardId, entryIndex, sortedLog, sleepLog) => {
  let index = entryIndex + 1;
  let startTime, endTime;
  if (!sleepLog[guardId]) sleepLog[guardId] = {};
  while (sortedLog[index]) {
    if (sortedLog[index].includes('falls asleep')) {
      startTime = getDateFromEntry(sortedLog[index]);
      index++;
    } else if (sortedLog[index].includes('wakes up')) {
      endTime = getDateFromEntry(sortedLog[index]);
      mergeWith(sleepLog[guardId], getSleepingHours(startTime, endTime), customiser);
      index++;
    } else break;
  }
  if (sortedLog[index])
    getGuardSleep(extractGuardIdFromEntry(sortedLog[index]), index, sortedLog, sleepLog);
};

const fillSleepLog = log => {
  const sortedLog = sortTimeEntries(log);
  const firstGuardIndex = extractGuardIdFromEntry(sortedLog[0]);
  let sleepLog = {};
  getGuardSleep(firstGuardIndex, 0, sortedLog, sleepLog);
  return sleepLog;
};

const sleepLogsMerge = guardLog => {
  let flatLog = [];
  Object.keys(guardLog).forEach(date => {
    flatLog = flatLog.concat(guardLog[date]);
  });
  return sortBy(flatLog);
};

const part1 = () => {
  return 0;
};
const part2 = () => {
  return 0;
};
module.exports = {
  extractDateFromEntry,
  extractGuardIdFromEntry,
  sortTimeEntries,
  convertDateStringToMoment,
  getSleepingHours,
  fillSleepLog,
  sleepLogsMerge,
  part1,
  part2,
};
