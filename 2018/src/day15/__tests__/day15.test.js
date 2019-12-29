const { flatten } = require('lodash');
const {
  PLAYER_TYPES,
  parse2dArray,
  parseMap,
  getNextSteps,
  getPossibleTargets,
  getShortestPath,
  getClosestOpponent,
  playRound,
  part1,
  part2
} = require('../parts');

const testInput = [
  '#######      ',
  '#E....#      ',
  '#...#.#      ',
  '#.G.#G#      ',
  '#######      '
];

const testInput2 = [
  '#########',
  '#G..G..G#',
  '#.......#',
  '#.......#',
  '#G..E..G#',
  '#.......#',
  '#.......#',
  '#G..G..G#',
  '#########'
];

const testInput3 = [
  '####### ',
  '#.G...# ',
  '#...EG# ',
  '#.#.#G# ',
  '#..G#E# ',
  '#.....# ',
  '####### '
];

const testInput4 = [
  '####### ',
  '#G..#E# ',
  '#E#E.E# ',
  '#G.##.# ',
  '#...#E# ',
  '#...E.# ',
  '####### '
];

const testInput5 = [
  '####### ',
  '#E..EG# ',
  '#.#G.E# ',
  '#E.##E# ',
  '#G..#.# ',
  '#..E#.# ',
  '####### '
];

const testInput6 = [
  '####### ',
  '#E.G#.# ',
  '#.#G..# ',
  '#G.#.G# ',
  '#G..#.# ',
  '#...E.# ',
  '####### '
];

const testInput7 = [
  '####### ',
  '#.E...# ',
  '#.#..G# ',
  '#.###.# ',
  '#E#G#G# ',
  '#...#G# ',
  '####### '
];

const testInput8 = [
  '######### ',
  '#G......# ',
  '#.E.#...# ',
  '#..##..G# ',
  '#...##..# ',
  '#...#...# ',
  '#.G...G.# ',
  '#.....G.# ',
  '######### '
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
  it('should get the potential opponents', () => {
    expect(getPossibleTargets({ x: 1, y: 1 }, testMap)).toEqual([
      {
        path: [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
        previousSpot: { x: 2, y: 2 },
        x: 3,
        y: 2
      },
      {
        path: [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }],
        previousSpot: { x: 3, y: 1 },
        x: 3,
        y: 2
      },
      {
        path: [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }],
        previousSpot: { x: 3, y: 3 },
        x: 3,
        y: 2
      },
      {
        path: [
          { x: 1, y: 1 },
          { x: 1, y: 2 },
          { x: 1, y: 3 },
          { x: 1, y: 4 },
          { x: 1, y: 5 },
          { x: 2, y: 5 }
        ],
        previousSpot: { x: 2, y: 5 },
        x: 3,
        y: 5
      }
    ]);
  });
  it('should get next steps', () => {
    expect(getNextSteps('G', { x: 1, y: 1 }, testMap)).toEqual([{ x: 1, y: 2 }, { x: 2, y: 1 }]);
    expect(getNextSteps('G', { x: 1, y: 4 }, testMap)).toEqual([{ x: 1, y: 3 }, { x: 1, y: 5 }]);
    expect(getNextSteps('G', { x: 3, y: 5 }, testMap)).toEqual([{ x: 2, y: 5 }]);
  });
  it('should get the shortest path', () => {
    expect(getShortestPath({ x: 1, y: 1 }, testMap)).toMatchObject({
      x: 3,
      y: 2,
      path: [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 2 }]
    });
    expect(getShortestPath({ x: 1, y: 4 }, testMap2)).toMatchObject({
      x: 4,
      y: 4,
      path: [{ x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }]
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
      '#########'
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
      '#########'
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
      '#########'
    ]);
  });
  it('should get the closest opponent', () => {
    const expectedMap = parse2dArray([
      '#########',
      '#.......#',
      '#..GGG..#',
      '#..GEG..#',
      '#G..G...#',
      '#......G#',
      '#.......#',
      '#.......#',
      '#########'
    ]);
    expect(getClosestOpponent({ x: 2, y: 3 }, expectedMap)).toEqual(undefined);
    expect(getClosestOpponent({ x: 2, y: 4 }, expectedMap)).toMatchObject({ x: 3, y: 4 });
    expect(getClosestOpponent({ x: 3, y: 4 }, expectedMap)).toMatchObject({ x: 2, y: 4 });
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
      '####### '
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
      '####### '
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
      '####### '
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
      '####### '
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
      '####### '
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
      '####### '
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
      '####### '
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
      '####### '
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
      '####### '
    ]);
    expect(getHitPoints(testMap3)).toEqual([200, 131, 59, 200]);
  });
  it('should solve part 1', () => {
    expect(part1(testInput3)).toEqual({ completedRounds: 47, totalHp: 590, winner: 'G' });
    expect(part1(testInput4)).toEqual({ completedRounds: 37, totalHp: 982, winner: 'E' });
    expect(part1(testInput5)).toEqual({ completedRounds: 46, totalHp: 859, winner: 'E' });
    expect(part1(testInput6)).toEqual({ completedRounds: 35, totalHp: 793, winner: 'G' });
    expect(part1(testInput7)).toEqual({ completedRounds: 54, totalHp: 536, winner: 'G' });
    expect(part1(testInput8)).toEqual({ completedRounds: 20, totalHp: 937, winner: 'G' });
  });
  it('should solve part 2', () => {
    expect(part2(testInput3)).toEqual({
      elvesAttackingPower: 15,
      fightCompletedRounds: 29,
      fightFinalHp: 172
    });
    expect(part2(testInput5)).toEqual({
      elvesAttackingPower: 4,
      fightCompletedRounds: 33,
      fightFinalHp: 948
    });
    expect(part2(testInput6)).toEqual({
      elvesAttackingPower: 15,
      fightCompletedRounds: 37,
      fightFinalHp: 94
    });
    expect(part2(testInput7)).toEqual({
      elvesAttackingPower: 12,
      fightCompletedRounds: 39,
      fightFinalHp: 166
    });
    expect(part2(testInput8)).toEqual({
      elvesAttackingPower: 34,
      fightCompletedRounds: 30,
      fightFinalHp: 38
    });
  });
});
