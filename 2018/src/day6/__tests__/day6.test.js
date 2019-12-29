const {
  formatInput,
  getEdges,
  manhattanDistance,
  countClosestLocations,
  measureDistanceToAllPoints,
  part1,
  part2
} = require('../parts');

const input = ['1, 1', '1, 6', '8, 3', '3, 4', '5, 5', '8, 9'];

const coordinates = formatInput(input);

describe('Day 6', () => {
  it('should get the edges of coordinates', () => {
    expect(getEdges(coordinates)).toEqual({ xMin: 1, xMax: 8, yMin: 1, yMax: 9 });
  });

  it.each([
    [{ x: 1, y: 1 }, { x: 1, y: 1 }, 0],
    [{ x: 1, y: 6 }, { x: 1, y: 1 }, 5],
    [{ x: 1, y: 1 }, { x: 3, y: 4 }, 5],
    [{ x: 1, y: 1 }, { x: -1, y: 2 }, 3]
  ])('should correctly compute manhattan distances', (a, b, expected) => {
    expect(manhattanDistance(a, b)).toEqual(expected);
  });

  it('should get the number of points', () => {
    expect([1, 2, 3, 4, 5].map(index => countClosestLocations(coordinates, index))).toEqual([
      -1,
      -1,
      9,
      17,
      -1
    ]);
  });

  it('should solve part1', () => {
    expect(part1(input)).toEqual(17);
  });

  it('should calculate the sum of distances', () => {
    expect(measureDistanceToAllPoints({ x: 4, y: 3 }, coordinates)).toEqual(30);
  });

  it('should solve part 2', () => {
    expect(part2(input, 32)).toEqual(16);
  });
});
