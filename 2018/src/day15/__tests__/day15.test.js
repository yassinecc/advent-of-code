const {
  parse2dArray,
  parseMap,
  getNextSteps,
  getShortestPath,
  playRound,
  part1,
  part2,
} = require('../parts');

const testInput = ['#######', '#E....#', '#...#.#', '#.G.#G#', '#######'];

const testInput2 = [
  '#########',
  '#G..G..G#',
  '#.......#',
  '#.......#',
  '#G..E..G#',
  '#.......#',
  '#.......#',
  '#G..G..G#',
  '#########',
];

const testMap = parse2dArray(testInput);

const testMap2 = parse2dArray(testInput2);

describe('Day 15', () => {
  it('should parse maps', () => {
    expect(parseMap(testMap)).toEqual(testInput);
    expect(parseMap(testMap2)).toEqual(testInput2);
  });
  it('should get next steps', () => {
    expect(getNextSteps('G', { x: 1, y: 1 }, testMap)).toEqual([{ x: 1, y: 2 }, { x: 2, y: 1 }]);
    expect(getNextSteps('G', { x: 1, y: 4 }, testMap)).toEqual([{ x: 1, y: 3 }, { x: 1, y: 5 }]);
    expect(getNextSteps('G', { x: 3, y: 5 }, testMap)).toEqual([{ x: 2, y: 5 }]);
  });
  it('should get the shortest path', () => {
    expect(getShortestPath({ x: 1, y: 1 }, testMap)).toEqual({
      x: 3,
      y: 2,
      path: [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
    });
  });
  it('should play rounds', () => {
    playRound(testMap2);
    expect(parseMap(testMap2)).toEqual([
      '#########',
      '#.G...G.#',
      '#...G...#',
      '#...E..G#',
      '#.G.....#',
      '#.......#',
      '#G..G..G#',
      '#.......#',
      '#########',
    ]);
    playRound(testMap2);
    expect(parseMap(testMap2)).toEqual([
      '#########',
      '#..G.G..#',
      '#...G...#',
      '#.G.E.G.#',
      '#.......#',
      '#G..G..G#',
      '#.......#',
      '#.......#',
      '#########',
    ]);
    playRound(testMap2);
    expect(parseMap(testMap2)).toEqual([
      '#########',
      '#.......#',
      '#..GGG..#',
      '#..GEG..#',
      '#G..G...#',
      '#......G#',
      '#.......#',
      '#.......#',
      '#########',
    ]);
  });
  it('should solve part 1', () => {
    expect(part1()).toEqual(0);
  });
  it('should solve part 2', () => {
    expect(part2()).toEqual(0);
  });
});
