const { parseInput, addMarble, part1, part2 } = require('../parts');

const testArray = [
  [0],
  [0, 1],
  [0, 2, 1],
  [0, 2, 1, 3],
  [0, 4, 2, 1, 3],
  [0, 4, 2, 5, 1, 3],
  [0, 4, 2, 5, 1, 6, 3],
  [0, 4, 2, 5, 1, 6, 3, 7],
  [0, 8, 4, 2, 5, 1, 6, 3, 7],
];
const indicesArray = [0, 1, 1, 3, 1, 3, 5, 7, 1];

describe('Day 9', () => {
  it('should correclty parse an input', () => {
    expect(parseInput('478 players; last marble is worth 71240 points')).toEqual({
      numberOfPlayers: 478,
      maxPoints: 71240,
    });
  });

  it('should correctly add standard marbles', () => {
    let array = testArray[0];
    let index = 0;
    [...Array(8).keys()].forEach(idx => {
      const result = addMarble(array, index, idx + 1);
      array = result.array;
      index = result.index;
      score = result.score;
      expect(array).toEqual(testArray[idx + 1]);
      expect(index).toEqual(indicesArray[idx + 1]);
      expect(score).toEqual(0);
    });
  });
  const arr = [0, 16, 8, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15];
  it('should correctly add a 23rd marble', () => {
    const xpected = [0, 16, 8, 17, 4, 18, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15];
    expect(addMarble(arr, 13, 23)).toEqual({ array: xpected, index: 6, score: 32 });
  });
  it('should correctly add a 23rd marble - negative index', () => {
    const xpected = [0, 16, 8, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 3, 14, 7, 15];
    expect(addMarble(arr, 2, 23)).toEqual({ array: xpected, index: 18, score: 36 });
  });
  it('should correctly add a 23rd marble - right edge', () => {
    const xpected = [0, 16, 8, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7];
    expect(addMarble(arr, 6, 23)).toEqual({ array: xpected, index: 0, score: 38 });
  });
  it('should solve part 1', () => {
    expect(part1()).toEqual(0);
  });
  it('should solve part 2', () => {
    expect(part2()).toEqual(0);
  });
});
