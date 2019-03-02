const { parseMap, getNextSteps, getShortestPath, part1, part2 } = require('../parts');

const testInput = ['#######', '#E..G.#', '#...#.#', '#.G.#G#', '#######'];

const testMap = parseMap(testInput);

describe('Day 15', () => {
  it('should get next steps', () => {
    expect(getNextSteps({ x: 1, y: 1 }, testMap)).toEqual([{ x: 1, y: 2 }, { x: 2, y: 1 }]);
    expect(getNextSteps({ x: 1, y: 4 }, testMap)).toEqual([{ x: 1, y: 3 }, { x: 1, y: 5 }]);
    expect(getNextSteps({ x: 3, y: 5 }, testMap)).toEqual([{ x: 2, y: 5 }]);
  });
  it('should get the shortest path', () => {
    expect(getShortestPath({ x: 1, y: 1 }, { x: 3, y: 2 }, testMap)).toEqual({
      x: 3,
      y: 2,
      path: [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
    });
  });
  it('should solve part 1', () => {
    expect(part1()).toEqual(0);
  });
  it('should solve part 2', () => {
    expect(part2()).toEqual(0);
  });
});
