const { sortBy, range, flow, mergeWith, isArray, countBy, reduce, map } = require('lodash');
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

const findSleepiestGuard = (sleepLog, comparator) => {
  const flatSleepLogs = map(sleepLog, (guardLog, key) => {
    return { guardId: key, log: sleepLogsMerge(guardLog) };
  });
  let finalGuardId = 0;
  let finalLog = [];
  flatSleepLogs.forEach(guardLog => {
    if (comparator(guardLog.log, finalLog)) {
      finalGuardId = Number(guardLog.guardId);
      finalLog = guardLog.log;
    }
  });
  return { guardId: finalGuardId, log: finalLog };
};

const findLongestSleepGuard = sleepLog =>
  findSleepiestGuard(sleepLog, (a, b) => a.length > b.length);

const findFrequentSleepGuard = sleepLog =>
  findSleepiestGuard(sleepLog, (a, b) => getHighestFrequency(a) > getHighestFrequency(b));

const getMostFrequentMark = minutesLog =>
  reduce(countBy(minutesLog), (localMax, value, index, source) =>
    source[localMax] > value ? localMax : index
  );

const getHighestFrequency = minutesLog => {
  const frequencies = countBy(minutesLog);
  let finalFrequency = 0;
  Object.values(frequencies).forEach(frequency => {
    finalFrequency = Math.max(frequency, finalFrequency);
  });
  return finalFrequency;
};

const part1 = log => {
  const sleepLog = fillSleepLog(log);
  const guardLog = findLongestSleepGuard(sleepLog);
  const mostSleptMinute = getMostFrequentMark(guardLog.log);
  return mostSleptMinute * guardLog.guardId;
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
  findLongestSleepGuard,
  findFrequentSleepGuard,
  getMostFrequentMark,
  part1,
  part2,
};
