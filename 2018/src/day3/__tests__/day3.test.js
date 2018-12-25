const { parseFile } = require('advent-of-code-2018/utils/common');
const { parseClaim, doClaimsIntersect, part1, part2 } = require('../parts');

const claimsList = parseFile('inputs/day3.txt');

describe('Day3', () => {
  it('should correctly parse claims', () =>
    expect(parseClaim('#1 @ 604,670: 22x16')).toEqual({
      xStart: 604,
      deltaX: 22,
      yStart: 670,
      deltaY: 16,
    }));
  it('should correctly count overlap size', () => {
    expect(part1(['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'], 10)).toEqual(4);
  });
  it.each([
    ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', true],
    ['#1 @ 1,3: 4x4', '#0 @ 2,2: 4x4', true],
    ['#3 @ 5,5: 2x2', '#2 @ 3,1: 4x4', false],
    ['#1 @ 1,3: 4x4', '#3 @ 5,5: 2x2', false],
  ])('should correctly determine if rectangles are overlapping', (a, b, expected) => {
    expect(doClaimsIntersect(a, b)).toBe(expected);
  });
  const claim = claimsList[0];
  it.each(claimsList.slice(1))('%s should swap', a => {
    expect(doClaimsIntersect(claim, a)).toEqual(doClaimsIntersect(a, claim));
  });
});
