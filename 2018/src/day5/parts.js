const { findIndex } = require('lodash');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
let toReplace = alphabet.map(char => char + char.toUpperCase());
toReplace = toReplace.concat(alphabet.map(char => char.toUpperCase() + char));

const react = word => {
  let lengthBefore; let lengthAfter;
  do {
    lengthBefore = word.length;
    toReplace.forEach(single => {
      word = word.split(single).join('');
    });
    lengthAfter = word.length;
  } while (lengthBefore !== lengthAfter);
  return word;
};

const part1 = word => {
  return react(word).length;
};
const part2 = word => {
  let length = word.length;
  alphabet.forEach(single => {
    let newWord;
    newWord = word.split(single).join('');
    newWord = newWord.split(single.toUpperCase()).join('');
    const secondReaction = react(newWord);
    length = Math.min(length, secondReaction.length);
  });
  return length;
};
module.exports = { part1, part2 };
