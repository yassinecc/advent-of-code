const { parseClaim, part1 } = require('../parts');

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
});
