const {
  extractDateFromEntry,
  extractGuardIdFromEntry,
  convertDateStringToMoment,
  sortTimeEntries,
  getSleepingHours,
  fillSleepLog,
  sleepLogsMerge,
  getMostFrequentMark,
} = require('../parts');

const log = [
  '[1518-11-01 00:00] Guard #10 begins shift',
  '[1518-11-01 00:15] falls asleep',
  '[1518-11-01 00:25] wakes up',
  '[1518-11-01 00:30] falls asleep',
  '[1518-11-01 00:35] wakes up',
  '[1518-11-01 23:58] Guard #99 begins shift',
  '[1518-11-02 00:40] falls asleep',
  '[1518-11-02 00:50] wakes up',
  '[1518-11-03 00:05] Guard #10 begins shift',
  '[1518-11-03 00:24] falls asleep',
  '[1518-11-03 00:29] wakes up',
  '[1518-11-04 00:02] Guard #99 begins shift',
  '[1518-11-04 00:36] falls asleep',
  '[1518-11-04 00:46] wakes up',
  '[1518-11-05 00:03] Guard #99 begins shift',
  '[1518-11-05 00:45] falls asleep',
  '[1518-11-05 00:55] wakes up',
];

describe('Day4', () => {
  it('should correctly extract date strings', () => {
    expect(extractDateFromEntry('[1518-09-20 00:43] falls asleep')).toEqual('1518-09-20 00:43');
  });

  it('should correctly extract guard IDs', () => {
    expect(extractGuardIdFromEntry('[1518-09-20 00:43] Guard #99 begins shift')).toEqual('99');
  });

  it('should sort entries according to dates', () => {
    expect(
      sortTimeEntries([
        '[1518-11-01 00:00] Guard #10 begins shift',
        '[1518-11-01 00:30] falls asleep',
        '[1518-11-01 00:05] falls asleep',
        '[1518-11-01 00:25] wakes up',
      ])
    ).toEqual([
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:05] falls asleep',
      '[1518-11-01 00:25] wakes up',
      '[1518-11-01 00:30] falls asleep',
    ]);
  });

  it.each([
    [
      convertDateStringToMoment('1518-11-01 00:05'),
      convertDateStringToMoment('1518-11-01 00:10'),
      { '1518-11-01': [5, 6, 7, 8, 9] },
    ],
    [
      convertDateStringToMoment('1518-11-01 23:05'),
      convertDateStringToMoment('1518-11-02 00:10'),
      { '1518-11-02': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
    ],
  ])('should get the correct sleeping marks', (a, b, expected) => {
    expect(getSleepingHours(a, b)).toEqual(expected);
  });

  const sleepLog = fillSleepLog(log);
  it('should correctly get the guards sleep times', () => {
    expect(sleepLog).toEqual({
      '10': {
        '1518-11-01': [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34],
        '1518-11-03': [24, 25, 26, 27, 28],
      },
      '99': {
        '1518-11-02': [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
        '1518-11-04': [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
        '1518-11-05': [45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
      },
    });
  });

  const flatLog = sleepLogsMerge(sleepLog['10']);
  it('should flatten the sleep log', () => {
    expect(flatLog).toEqual([
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      24,
      25,
      26,
      27,
      28,
      30,
      31,
      32,
      33,
      34,
    ]);
  });

  it('should get the most slept minute', () => {
    expect(getMostFrequentMark(flatLog)).toEqual('24');
  });
});
