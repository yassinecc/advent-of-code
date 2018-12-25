const { findInvertedCase, part1 } = require('../parts');

describe('Day 5', () => {
  it.each([
    ['dabAcCaCBAcCcaDA', 4],
    ['dabAaCBAcCcaDA', 3],
    ['dabCBAcCcaDA', 6],
    ['dabCBAcaDA', -1],
    ['aabAAB', -1],
  ])('should find the inverted index for %s', (string, expected) => {
    expect(findInvertedCase(string)).toEqual(expected);
  });

  it('should eliminate all pairs', () => {
    expect(part1('dabAcCaCBAcCcaDA')).toEqual(10);
  });
});
