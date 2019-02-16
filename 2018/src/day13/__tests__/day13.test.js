const Matrix = require('vectorious').Matrix;
const { parseTracks, advanceCart, part1, part2 } = require('../parts');

const initialTestCase = {
  carts: [{ type: '>', x: 0, y: 2, turnFlag: 0 }, { type: 'v', x: 3, y: 9, turnFlag: 0 }],
  tracksMatrix: new Matrix(
      new Vector([
        2,
        0,
        0,
        0,
        3,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        1,
        -1,
        -1,
        -1,
        1,
        -1,
        -1,
        2,
        0,
        0,
        0,
        0,
        3,
        1,
        -1,
        2,
        0,
        4,
        0,
        0,
        4,
        0,
        3,
        -1,
        -1,
        1,
        1,
        -1,
        1,
        -1,
        1,
        -1,
        -1,
        1,
        -1,
        1,
        -1,
        -1,
        1,
        3,
        0,
        4,
        0,
        2,
        -1,
        -1,
        3,
        0,
        4,
        0,
        0,
        2,
        -1,
        -1,
        3,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        0,
        0,
        0,
      ]),
      { shape: [6, 13] }
  ),
};

describe('Day 13', () => {
  it('should parse test tracks', () => {
    const testTracks = String.raw`
/->-\        
|   |  /----\
| /-+--+-\  |
| | |  | v  |
\-+-/  \-+--/
  \------/
`;
    const testTrackLines = testTracks.split('\n').filter(track => track.length > 0);
    expect(parseTracks(testTrackLines)).toEqual(initialTestCase);
  });
  it('should advance carts', () => {
    const { carts } = initialTestCase;

    const cart11 = advanceCart(carts[0], '-');
    const cart21 = advanceCart(carts[1], '|');
    const expectedCart11 = { type: '>', x: 0, y: 3, turnFlag: 0 };
    const expectedCart21 = { type: 'v', x: 4, y: 9, turnFlag: 0 };
    expect(cart11).toEqual(expectedCart11);
    expect(cart21).toEqual(expectedCart21);

    const cart12 = advanceCart(expectedCart11, '-');
    const cart22 = advanceCart(expectedCart21, '+');
    const expectedCart12 = { type: '>', x: 0, y: 4, turnFlag: 0 };
    const expectedCart22 = { type: '>', x: 4, y: 10, turnFlag: 1 };
    expect(cart12).toEqual(expectedCart12);
    expect(cart22).toEqual(expectedCart22);
    expect(cart21).toEqual(expectedCart21);

    const cart13 = advanceCart(expectedCart12, '\\');
    const cart23 = advanceCart(expectedCart22, '-');
    const expectedCart13 = { type: 'v', x: 1, y: 4, turnFlag: 0 };
    const expectedCart23 = { type: '>', x: 4, y: 11, turnFlag: 1 };
    expect(cart13).toEqual(expectedCart13);
    expect(cart23).toEqual(expectedCart23);
  });
  it('should solve part 1', () => {
    expect(part1()).toEqual(0);
  });
  it('should solve part 2', () => {
    expect(part2()).toEqual(0);
  });
});
