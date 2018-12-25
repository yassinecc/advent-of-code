const { findIndex } = require('lodash');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
let toReplace = alphabet.map(char => char + char.toUpperCase());
toReplace = toReplace.concat(alphabet.map(char => char.toUpperCase() + char));

const part1 = word => {
  let lengthBefore, lengthAfter;
  do {
    lengthBefore = word.length;
    toReplace.forEach(single => {
      word = word.split(single).join('');
    });
    lengthAfter = word.length;
  } while (lengthBefore !== lengthAfter);
  return word.length;
};
const part2 = () => {
  return 0;
};
module.exports = { part1, part2 };
