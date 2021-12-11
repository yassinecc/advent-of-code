const { array } = require('vectorious');

const { arraySum } = require('../math');

describe('Day3', () => {
  it('should correctly multiply arrays', () => {
    const c = array([[2, 0], [-1, 3]]);
    const d = array([[7, 1], [-2, 3]]);
    const result = array([[9, 1], [-3, 6]]);
    expect(arraySum(c, d)).toEqual(result);
  });
});
