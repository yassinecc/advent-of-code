const { fillNode, part1, part2 } = require('../parts');

const input = ['2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'];

const file = input[0].split(' ').map(Number);

describe('Day 8', () => {
  it('should correctly return for a leaf', () => {
    expect(fillNode({}, file, 2)).toEqual(7);
    expect(fillNode({}, file, 9)).toEqual(12);
  });
  it('should correctly return for a parent with a single leaf', () => {
    expect(fillNode({}, file, 7)).toEqual(13);
  });
  it('should solve part 1', () => {
    expect(part1(input)).toEqual({ value: 138 });
  });
  it('should solve part 2', () => {
    expect(part2()).toEqual(0);
  });
});
