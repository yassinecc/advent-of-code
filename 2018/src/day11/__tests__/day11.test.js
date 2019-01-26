const { getEnergyLevel, getAreaEnergyLevel, part1, part2 } = require('../parts');

describe('Day 11', () => {
  it.each([
    [{ x: 3, y: 5 }, 8, 4],
    [{ x: 122, y: 79 }, 57, -5],
    [{ x: 217, y: 196 }, 39, 0],
    [{ x: 101, y: 153 }, 71, 4],
  ])('should find the correct energy', (c, s, r) => expect(getEnergyLevel(c, s)).toEqual(r));

  it.each([[{ x: 33, y: 45 }, 18, 29], [{ x: 21, y: 61 }, 42, 30]])(
      'should find the correct area energy',
      (c, s, r) => expect(getAreaEnergyLevel(c, s)).toEqual(r)
  );

  it('should solve part 1', () => {
    expect(part1(18)).toEqual({ x: 33, y: 45 });
    expect(part1(42)).toEqual({ x: 21, y: 61 });
  });
  it('should solve part 2', () => {
    expect(part2()).toEqual(0);
  });
});
