const addMarble = (marbleArray, index, marble) => {
  const newMarbleArray = [...marbleArray];
  let insertionIndex;
  if (marble % 23 !== 0) {
    insertionIndex = ((index + 1) % marbleArray.length) + 1;
    newMarbleArray.splice(insertionIndex, 0, marble);
  } else {
    indexToRemove = index - 7;
    if (indexToRemove < 0) indexToRemove = marbleArray.length + indexToRemove;
    insertionIndex = indexToRemove % (marbleArray.length - 1);
    newMarbleArray.splice(indexToRemove, 1);
  }
  return { array: newMarbleArray, index: insertionIndex };
};

const part1 = () => 0;
const part2 = () => 0;
module.exports = { addMarble, part1, part2 };
