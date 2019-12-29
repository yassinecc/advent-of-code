const { hasRepetition, getPairs, findPairMatch, part1 } = require('../parts');

describe('Day2', () => {
  it('should correctly identify pairs in words', () => {
    expect(hasRepetition(2, 'abcdef')).toBeFalsy();
    expect(hasRepetition(2, 'bababc')).toBeTruthy();
    expect(hasRepetition(2, 'abbcde')).toBeTruthy();
    expect(hasRepetition(2, 'abcccd')).toBeFalsy();
    expect(hasRepetition(2, 'aabcdd')).toBeTruthy();
    expect(hasRepetition(2, 'abcdee')).toBeTruthy();
    expect(hasRepetition(2, 'ababab')).toBeFalsy();
  });
  it('should correctly identify triplets in words', () => {
    expect(hasRepetition(3, 'abcdef')).toBeFalsy();
    expect(hasRepetition(3, 'bababc')).toBeTruthy();
    expect(hasRepetition(3, 'abbcde')).toBeFalsy();
    expect(hasRepetition(3, 'abcccd')).toBeTruthy();
    expect(hasRepetition(3, 'aabcdd')).toBeFalsy();
    expect(hasRepetition(3, 'abcdee')).toBeFalsy();
    expect(hasRepetition(3, 'ababab')).toBeTruthy();
  });
  it('Should return the correct checksum for part 1', () => {
    expect(part1(['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab'])).toEqual(
        12
    );
  });

  it('Should get all pairs of an array', () => {
    expect(getPairs([])).toEqual([]);
    expect(getPairs([1])).toEqual([]);
    expect(getPairs([1, 2])).toEqual([[1, 2]]);
    expect(getPairs([1, 2, 3])).toEqual([[1, 2], [1, 3], [2, 3]]);
    expect(getPairs([1, 2, 3, 3])).toEqual([[1, 2], [1, 3], [1, 3], [2, 3], [2, 3], [3, 3]]);
  });
  it('Should return undefined if the two words don\'t have the same length', () => {
    expect(findPairMatch('abcde', 'a')).not.toBeDefined();
  });
  it.each([
    ['abcde', 'fghij', ''],
    ['abcde', 'bcdea', ''],
    ['abcde', 'edcba', 'c'],
    ['abcde', 'acdbe', 'ae'],
    ['abcde', 'adcbe', 'ace'],
    ['abcde', 'abcde', 'abcde'],
    ['abcde', 'abcze', 'abce']
  ])('should find the match between %s and %s', (a, b, expected) => {
    expect(findPairMatch(a, b)).toEqual(expected);
  });
});
