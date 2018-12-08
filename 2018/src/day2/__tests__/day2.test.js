const { hasRepetition, part1 } = require('../parts');

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
});
