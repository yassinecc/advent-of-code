const { findIndex } = require('lodash');

const findInvertedCase = word => {
  const charArray = [...word];
  return findIndex(charArray, (char, index) => {
    const nextChar = charArray[index + 1];
    if (!nextChar) {
      return false;
    } else if (char == char.toUpperCase()) {
      return char == nextChar.toUpperCase() && nextChar == nextChar.toLowerCase();
    } else {
      return char == nextChar.toLowerCase() && nextChar == nextChar.toUpperCase();
    }
  });
};

const part1 = word => {
  let index = findInvertedCase(word);
  while (index > -1) {
    let charArray = [...word];
    charArray.splice(index, 2);
    word = charArray.join('');
    index = findInvertedCase(word);
  }
  return word.length;
};
const part2 = () => {
  return 0;
};
module.exports = { findInvertedCase, part1, part2 };
