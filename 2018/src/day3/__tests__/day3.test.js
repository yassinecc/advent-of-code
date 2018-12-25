const { parseClaim, doClaimsIntersect, part1 } = require('../parts');

describe('Day3', () => {
  it('should correctly parse claims', () =>
    expect(parseClaim('#1 @ 604,670: 22x16')).toEqual({
      xStart: 670,
      deltaX: 16,
      yStart: 604,
      deltaY: 22,
    }));
  it('should correctly count overlap size', () => {
    expect(part1(['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'], 10)).toEqual(4);
  });
  it.each([
    [
      { xStart: 1, yStart: 3, deltaX: 4, deltaY: 4 },
      { xStart: 3, yStart: 1, deltaX: 4, deltaY: 4 },
      true,
    ],
    [
      { xStart: 1, yStart: 3, deltaX: 4, deltaY: 4 },
      { xStart: 2, yStart: 2, deltaX: 4, deltaY: 4 },
      true,
    ],
    [
      { xStart: 5, yStart: 5, deltaX: 2, deltaY: 2 },
      { xStart: 3, yStart: 1, deltaX: 4, deltaY: 4 },
      false,
    ],
    [
      { xStart: 1, yStart: 3, deltaX: 4, deltaY: 4 },
      { xStart: 5, yStart: 5, deltaX: 2, deltaY: 2 },
      false,
    ],
  ])('should correctly determine if rectangles are overlapping', (a, b, expected) => {
    expect(doClaimsIntersect(a, b)).toBe(expected);
  });
});
