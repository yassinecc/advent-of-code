const Matrix = require('vectorious').Matrix;

const cartCharacters = ['<', '>', '^', 'v'];

const trackTypes = ['-', '|', '/', '\\', '+'];

const findTrackType = (cartY, line) => {
  if (['-', '+'].includes(line[cartY - 1]) || ['-', '+'].includes(line[cartY + 1])) {
    return trackTypes.indexOf('-');
  }
  return trackTypes.indexOf('|');
};

const parseTracks = trackLines => {
  const tracksMatrix = new Matrix(trackLines.length, trackLines[0].length);
  const carts = [];
  trackLines.forEach((line, i) => {
    [...line].forEach((character, j) => {
      if (!cartCharacters.includes(character)) {
        tracksMatrix.set(i, j, trackTypes.indexOf(character));
      } else {
        carts.push({ x: i, y: j, type: character });
        tracksMatrix.set(i, j, findTrackType(j, line));
      }
    });
  });
  return { tracksMatrix, carts };
};
const part1 = () => 0;
const part2 = () => 0;
module.exports = { parseTracks, part1, part2 };
