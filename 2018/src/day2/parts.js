const { countBy, uniq } = require('lodash');

const hasRepetition = (size, word) => {
  const occurrenceNumbers = uniq(Object.values(countBy(word)));
  return occurrenceNumbers.includes(size);
};

const getPairs = array => {
  //array may contain duplicate elements
  const length = array.length;
  const pairsArray = [];
  for (var i = 0; i < length; i++) {
    for (var j = i + 1; j < length; j++) {
      pairsArray.push([array[i], array[j]]);
    }
  }
  return pairsArray;
};

const findPairMatch = (word1, word2) => {
  if (word1.length !== word2.length) return;
  else {
    const resultArray = [...word1].filter(
      (char, index) => word1.charAt(index) === word2.charAt(index)
    );
    return resultArray.join('');
  }
};

const part1 = wordsList => {
  const numberOfWordsWithPairs = wordsList.filter(word => hasRepetition(2, word)).length;
  const numberOfWordsWithTriplets = wordsList.filter(word => hasRepetition(3, word)).length;
  return numberOfWordsWithPairs * numberOfWordsWithTriplets;
};

const part2 = wordsList => {
  return getPairs(wordsList).forEach(pair => {
    const match = findPairMatch(...pair);
    if (match.length === pair[0].length - 1) {
      return match;
    }
  });
};

module.exports = { hasRepetition, getPairs, findPairMatch, part1, part2 };
