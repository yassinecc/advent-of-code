const { formatInput, manhattanDistance, countClosestLocations } = require('../parts');

const input = ['1, 1', '1, 6', '8, 3', '3, 4', '5, 5', '8, 9'];

describe('Day 6', () => {
  it.each([
    [{ x: 1, y: 1 }, { x: 1, y: 1 }, 0],
    [{ x: 1, y: 6 }, { x: 1, y: 1 }, 5],
    [{ x: 1, y: 1 }, { x: 3, y: 4 }, 5],
    [{ x: 1, y: 1 }, { x: -1, y: 2 }, 3],
  ])('should correctly compute manhattan distances', (a, b, expected) => {
    expect(manhattanDistance(a, b)).toEqual(expected);
  });

  it('should get the number of points', () => {
    const coordinates = formatInput(input);
    expect(countClosestLocations(coordinates, 3)).toEqual(9);
    expect(countClosestLocations(coordinates, 4)).toEqual(17);
  });
});
