const {
  parseMovementData,
  fillMovementData,
  moveParticle,
  findDimensions,
  part1,
  part2,
} = require('../parts');

const testInput = [
  'position=< 9,  1> velocity=< 0,  2>',
  'position=< 7,  0> velocity=<-1,  0>',
  'position=< 3, -2> velocity=<-1,  1>',
  'position=< 6, 10> velocity=<-2, -1>',
  'position=< 2, -4> velocity=< 2,  2>',
  'position=<-6, 10> velocity=< 2, -2>',
  'position=< 1,  8> velocity=< 1, -1>',
  'position=< 1,  7> velocity=< 1,  0>',
  'position=<-3, 11> velocity=< 1, -2>',
  'position=< 7,  6> velocity=<-1, -1>',
  'position=<-2,  3> velocity=< 1,  0>',
  'position=<-4,  3> velocity=< 2,  0>',
  'position=<10, -3> velocity=<-1,  1>',
  'position=< 5, 11> velocity=< 1, -2>',
  'position=< 4,  7> velocity=< 0, -1>',
  'position=< 8, -2> velocity=< 0,  1>',
  'position=<15,  0> velocity=<-2,  0>',
  'position=< 1,  6> velocity=< 1,  0>',
  'position=< 8,  9> velocity=< 0, -1>',
  'position=< 3,  3> velocity=<-1,  1>',
  'position=< 0,  5> velocity=< 0, -1>',
  'position=<-2,  2> velocity=< 2,  0>',
  'position=< 5, -2> velocity=< 1,  2>',
  'position=< 1,  4> velocity=< 2,  1>',
  'position=<-2,  7> velocity=< 2, -2>',
  'position=< 3,  6> velocity=<-1, -1>',
  'position=< 5,  0> velocity=< 1,  0>',
  'position=<-6,  0> velocity=< 2,  0>',
  'position=< 5,  9> velocity=< 1, -2>',
  'position=<14,  7> velocity=<-2,  0>',
  'position=<-3,  6> velocity=< 2, -1>',
];

const shortTestInput = [
  'position=< 9,  1> velocity=< 0,  2>',
  'position=< 7,  0> velocity=<-1,  0>',
  'position=< 3, -2> velocity=<-1,  1>',
];

describe('Day 10', () => {
  const movementData = 'position=< 2, -4> velocity=<-2, 12>';
  it('should parse movementData', () => {
    expect(parseMovementData(movementData)).toEqual({
      pos: [2, -4],
      vel: [-2, 12],
    });
  });
  it('should fill data', () => {
    expect(fillMovementData(shortTestInput)).toEqual([
      { pos: [9, 1], vel: [0, 2] },
      { pos: [7, 0], vel: [-1, 0] },
      { pos: [3, -2], vel: [-1, 1] },
    ]);
  });
  it('should move a particle', () => {
    expect(moveParticle({ pos: [9, 1], vel: [-1, 2] })).toEqual({ pos: [8, 3], vel: [-1, 2] });
  });
  it('should find minimal dimensions', () => {
    expect(
        findDimensions([
          { pos: [9, 1], vel: [0, 2] },
          { pos: [7, 0], vel: [-1, 0] },
          { pos: [3, -2], vel: [-1, 1] },
        ])
    ).toEqual({ xDiff: 6, yDiff: 3 });
  });
  it('should solve part 1', () => {
    expect(part1()).toEqual(0);
  });
  it('should solve part 2', () => {
    expect(part2()).toEqual(0);
  });
});
