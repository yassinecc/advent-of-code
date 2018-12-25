const { extractDateFromEntry } = require('../parts');

describe('Day4', () => {
  it('should correctly extract date strings', () => {
    expect(extractDateFromEntry('[1518-09-20 00:43] falls asleep')).toEqual('1518-09-20 00:43');
  });
});
