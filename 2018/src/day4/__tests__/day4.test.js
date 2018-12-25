const { extractDateFromEntry, sortTimeEntries } = require('../parts');

describe('Day4', () => {
  it('should correctly extract date strings', () => {
    expect(extractDateFromEntry('[1518-09-20 00:43] falls asleep')).toEqual('1518-09-20 00:43');
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
});
