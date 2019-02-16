const Matrix = require('vectorious').Matrix;
const { parseTracks, part1, part2 } = require('../parts');

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
    expect(parseTracks(testTrackLines)).toEqual({
      carts: [{ type: '>', x: 0, y: 2 }, { type: 'v', x: 3, y: 9 }],
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
    });
  });
  it('should solve part 1', () => {
    expect(part1()).toEqual(0);
  });
  it('should solve part 2', () => {
    expect(part2()).toEqual(0);
  });
});
