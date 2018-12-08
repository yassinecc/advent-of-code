const { countBy, uniq } = require('lodash');

const hasRepetition = (size, word) => {
  const occurrenceNumbers = uniq(Object.values(countBy(word)));
  return occurrenceNumbers.includes(size);
};

const part1 = wordsList => {
  const numberOfWordsWithPairs = wordsList.filter(word => hasRepetition(2, word)).length;
  const numberOfWordsWithTriplets = wordsList.filter(word => hasRepetition(3, word)).length;
  return numberOfWordsWithPairs * numberOfWordsWithTriplets;
};

part1(['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab']);

module.exports = { hasRepetition, part1 };
