const Matrix = require('vectorious').Matrix;

const { arraySum } = require('../math');

describe('Day3', () => {
  it('should correctly multiply arrays', () => {
    const c = new Matrix([[2, 0], [-1, 3]]);
    const d = new Matrix([[7, 1], [-2, 3]]);
    const result = new Matrix([[9, 1], [-3, 6]]);
    expect(arraySum(c, d)).toEqual(result);
  });
});
