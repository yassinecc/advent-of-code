const { part1 } = require('../parts');

describe('Day 5', () => {
  it('should eliminate all pairs', () => {
    expect(part1('dabAcCaCBAcCcaDA')).toEqual(10);
  });
});
