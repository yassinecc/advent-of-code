const { part1, part2 } = require('../parts');

describe('Day 5', () => {
  it('should eliminate all pairs', () => {
    expect(part1('dabAcCaCBAcCcaDA')).toEqual(10);
  });

  it('should remove the C/c units', () => {
    expect(part2('dabAcCaCBAcCcaDA')).toEqual(4);
  });
});
