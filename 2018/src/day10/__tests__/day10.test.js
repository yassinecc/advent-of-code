const { parseMovementData, part1, part2 } = require('../parts');

describe('Day 10', () => {
  const movementData = 'position=< 2, -4> velocity=<-2, 12>';
  it('should parse movementData', () => {
    expect(parseMovementData(movementData)).toEqual({
      positionData: [2, -4],
      velocityData: [-2, 12],
    });
  });
  it('should solve part 1', () => {
    expect(part1()).toEqual(0);
  });
  it('should solve part 2', () => {
    expect(part2()).toEqual(0);
  });
});
