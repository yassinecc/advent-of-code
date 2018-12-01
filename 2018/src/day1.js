const { sum, uniq } = require('lodash');
const { parseFile } = require('../utils/parseFile');

const frequenciesList = parseFile('inputs/day1.txt');

// Part 1
const part1 = frequenciesList => {
  const result = sum(frequenciesList);
  return result;
};

// Part 2

const part2 = frequenciesList => {
  const reducer = (acc, currentValue, _, array) => {
    const nextSum = acc.length > 0 ? acc[acc.length - 1] + currentValue : 0;
    acc.push(nextSum);
    return acc;
  };
  let cumulativeSums = [frequenciesList[0]];
  cumulativeSums = frequenciesList.slice(1).reduce(reducer, cumulativeSums);
  let large = [...cumulativeSums.slice(1)];
  while (true) {
    const newArray = cumulativeSums.map(sum => sum + large[large.length - 1]);
    newLarge = large.concat(newArray);
    if (uniq(newLarge).length !== newLarge.length) {
      return newArray.find(elt => large.indexOf(elt) > -1);
    }
    large = newLarge;
  }
};

console.log('Sum of all frequencies is', part1(frequenciesList));
console.log('First duplicate element is', part2(frequenciesList));

module.exports = { part1, part2 };
