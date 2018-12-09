const { arraySum } = require('../math');

describe('Day3', () => {
  it('should correctly multiply arrays', () => {
    const c = [[2, 0], [-1, 3]];
    const d = [[7, 1], [-2, 3]];
    expect(arraySum(c, d)).toEqual([[14, 0], [2, 9]]);
  });
});
