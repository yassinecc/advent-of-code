const { part1, part2 } = require('../src/day1/parts');

describe('Day1', () => {
  it('Should correctly sum the array', () => {
    expect(part1([+1, -2, +3, +1])).toEqual(3);
    expect(part1([+1, +1, +1])).toEqual(3);
    expect(part1([+1, +1, -2])).toEqual(0);
    expect(part1([-1, -2, -3])).toEqual(-6);
  });
  it('Should find first duplicate element', () => {
    expect(part2([+1, -2, +3, +1])).toEqual(2);
    expect(part2([+1, -1])).toEqual(0);
    expect(part2([+3, +3, +4, -2, -4])).toEqual(10);
    expect(part2([-6, +3, +8, +5, -6])).toEqual(5);
    expect(part2([+7, +7, -2, -7, -4])).toEqual(14);
  });
});
