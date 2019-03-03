const { flatten } = require('lodash');
const {
  PLAYER_TYPES,
  parse2dArray,
  parseMap,
  getNextSteps,
  getShortestPath,
  getClosestOpponent,
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

const testInput3 = [
  '####### ',
  '#.G...# ',
  '#...EG# ',
  '#.#.#G# ',
  '#..G#E# ',
  '#.....# ',
  '####### ',
];

const testMap = parse2dArray(testInput);

const testMap2 = parse2dArray(testInput2);

const testMap3 = parse2dArray(testInput3);

const getHitPoints = map => {
  const players = flatten(map).filter(player => PLAYER_TYPES.includes(player.type));
  return players.map(player => player.hp);
};

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
  it('should get the closest opponent', () => {
    expect(getClosestOpponent({ x: 2, y: 3 }, testMap2)).toEqual(undefined);
    expect(getClosestOpponent({ x: 2, y: 4 }, testMap2)).toMatchObject({ x: 3, y: 4 });
    expect(getClosestOpponent({ x: 3, y: 4 }, testMap2)).toMatchObject({ x: 2, y: 4 });
  });
  it('should attack opponents in turns', () => {
    playRound(testMap3);
    expect(parseMap(testMap3)).toEqual([
      '####### ',
      '#..G..# ',
      '#...EG# ',
      '#.#G#G# ',
      '#...#E# ',
      '#.....# ',
      '####### ',
    ]);
    expect(getHitPoints(testMap3)).toEqual([200, 197, 197, 200, 197, 197]);
    playRound(testMap3);
    expect(parseMap(testMap3)).toEqual([
      '####### ',
      '#...G.# ',
      '#..GEG# ',
      '#.#.#G# ',
      '#...#E# ',
      '#.....# ',
      '####### ',
    ]);
    expect(getHitPoints(testMap3)).toEqual([200, 200, 188, 194, 194, 194]);
    [...Array(21).keys()].forEach(_ => playRound(testMap3));
    expect(parseMap(testMap3)).toEqual([
      '####### ',
      '#...G.# ',
      '#..G.G# ',
      '#.#.#G# ',
      '#...#E# ',
      '#.....# ',
      '####### ',
    ]);
    expect(getHitPoints(testMap3)).toEqual([200, 200, 131, 131, 131]);
    playRound(testMap3);
    expect(parseMap(testMap3)).toEqual([
      '####### ',
      '#..G..# ',
      '#...G.# ',
      '#.#G#G# ',
      '#...#E# ',
      '#.....# ',
      '####### ',
    ]);
    expect(getHitPoints(testMap3)).toEqual([200, 131, 200, 128, 128]);
    playRound(testMap3);
    expect(parseMap(testMap3)).toEqual([
      '####### ',
      '#.G...# ',
      '#..G..# ',
      '#.#.#G# ',
      '#..G#E# ',
      '#.....# ',
      '####### ',
    ]);
    expect(getHitPoints(testMap3)).toEqual([200, 131, 125, 200, 125]);
    playRound(testMap3);
    expect(parseMap(testMap3)).toEqual([
      '####### ',
      '#G....# ',
      '#.G...# ',
      '#.#.#G# ',
      '#...#E# ',
      '#..G..# ',
      '####### ',
    ]);
    expect(getHitPoints(testMap3)).toEqual([200, 131, 122, 122, 200]);
    playRound(testMap3);
    expect(parseMap(testMap3)).toEqual([
      '####### ',
      '#G....# ',
      '#.G...# ',
      '#.#.#G# ',
      '#...#E# ',
      '#...G.# ',
      '####### ',
    ]);
    expect(getHitPoints(testMap3)).toEqual([200, 131, 119, 119, 200]);
    playRound(testMap3);
    expect(parseMap(testMap3)).toEqual([
      '####### ',
      '#G....# ',
      '#.G...# ',
      '#.#.#G# ',
      '#...#E# ',
      '#....G# ',
      '####### ',
    ]);
    expect(getHitPoints(testMap3)).toEqual([200, 131, 116, 113, 200]);
    [...Array(21).keys()].forEach(_ => playRound(testMap3));
    expect(parseMap(testMap3)).toEqual([
      '####### ',
      '#G....# ',
      '#.G...# ',
      '#.#.#G# ',
      '#...#.# ',
      '#....G# ',
      '####### ',
    ]);
    expect(getHitPoints(testMap3)).toEqual([200, 131, 59, 200]);
  });
  it('should solve part 1', () => {
    expect(part1()).toEqual(0);
  });
  it('should solve part 2', () => {
    expect(part2()).toEqual(0);
  });
});
