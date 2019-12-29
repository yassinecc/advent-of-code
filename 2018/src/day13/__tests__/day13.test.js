const Matrix = require('vectorious').Matrix;
const { parseTracks, advanceCart, sortCarts, part1, part2 } = require('../parts');

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
        0
      ]),
      { shape: [6, 13] }
  )
};

const testTracks = String.raw`
/->-\        
|   |  /----\
| /-+--+-\  |
| | |  | v  |
\-+-/  \-+--/
  \------/
`;
const testTrackLines = testTracks.split('\n').filter(track => track.length > 0);

const testTracks2 = String.raw`
/>-<\  
|   |  
| /<+-\
| | | v
\>+</ |
  |   ^
  \<->/
`;

const testTrackLines2 = testTracks2.split('\n').filter(track => track.length > 0);

describe('Day 13', () => {
  it('should parse test tracks', () => {
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
  it('should sort carts', () => {
    const carts = [
      { x: 0, y: 39, type: '<' },
      { x: 0, y: 53, type: '>' },
      { x: 1, y: 116, type: '<' },
      { x: 27, y: 38, type: '^' },
      { x: 36, y: 49, type: '>' },
      { x: 36, y: 121, type: 'v' },
      { x: 44, y: 28, type: '<' },
      { x: 49, y: 11, type: '^' },
      { x: 50, y: 116, type: 'v' },
      { x: 55, y: 24, type: 'v' },
      { x: 74, y: 8, type: 'v' },
      { x: 93, y: 11, type: 'v' },
      { x: 95, y: 24, type: 'v' },
      { x: 110, y: 46, type: '>' },
      { x: 115, y: 4, type: '<' },
      { x: 121, y: 72, type: '<' },
      { x: 142, y: 76, type: '<' }
    ];
    const expectedSorted = [
      { x: 0, y: 39, type: '<' },
      { x: 0, y: 53, type: '>' },
      { x: 1, y: 116, type: '<' },
      { x: 27, y: 38, type: '^' },
      { x: 36, y: 49, type: '>' },
      { x: 36, y: 121, type: 'v' },
      { x: 44, y: 28, type: '<' },
      { x: 49, y: 11, type: '^' },
      { x: 50, y: 116, type: 'v' },
      { x: 55, y: 24, type: 'v' },
      { x: 74, y: 8, type: 'v' },
      { x: 93, y: 11, type: 'v' },
      { x: 95, y: 24, type: 'v' },
      { x: 110, y: 46, type: '>' },
      { x: 115, y: 4, type: '<' },
      { x: 121, y: 72, type: '<' },
      { x: 142, y: 76, type: '<' }
    ];
    expect(sortCarts(carts)).toEqual(expectedSorted);
  });
  it('should solve part 1', () => {
    expect(part1(testTrackLines)).toEqual('7,3');
  });
  it('should solve part 2', () => {
    expect(part2(testTrackLines2)).toEqual('6,4');
  });
});
