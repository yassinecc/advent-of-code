const { findRegex } = require('../../utils/common');

const parseInput = input => {
  const numberOfPlayers = Number(findRegex(input, /^([1-9]+)/));
  const maxPoints = Number(findRegex(input, /([0-9]+)\spoints/));
  return { numberOfPlayers, maxPoints };
};

const addMarble = (marbleArray, index, marble) => {
  const newMarbleArray = [...marbleArray];
  let insertionIndex;
  let score = 0;
  if (marble % 23 !== 0) {
    insertionIndex = ((index + 1) % marbleArray.length) + 1;
    newMarbleArray.splice(insertionIndex, 0, marble);
  } else {
    indexToRemove = index - 7;
    if (indexToRemove < 0) indexToRemove = marbleArray.length + indexToRemove;
    score = marble + marbleArray[indexToRemove];
    insertionIndex = indexToRemove % (marbleArray.length - 1);
    newMarbleArray.splice(indexToRemove, 1);
  }
  return { array: newMarbleArray, index: insertionIndex, score };
};

const part1 = () => 0;
const part2 = () => 0;
module.exports = { parseInput, addMarble, part1, part2 };
