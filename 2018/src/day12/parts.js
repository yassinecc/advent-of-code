const { findRegex } = require('../../utils/common');

const convertInput = input => input.replace(/#/g, 1).replace(/\./g, 0);

const getInitialState = input => {
  const convertedInput = convertInput(input);
  return findRegex(convertedInput, /([10]+)/g);
};

const getSpreadRules = input => {
  const convertedInput = convertInput(input);
  const rules = findRegex(convertedInput, /([10]+ => [10])/g);
  const result = [];
  rules.forEach(rule => {
    const [indexString, value] = rule.split(' => ');
    const index = parseInt(indexString, 2);
    result[index] = value;
  });
  return result;
};

const padInput = input => {
  const start = input.indexOf('1');
  const end = input.lastIndexOf('1');
  return `00000${input.slice(start, end + 1)}00000`;
};

const part1 = () => 0;
const part2 = () => 0;

module.exports = { getInitialState, getSpreadRules, padInput, part1, part2 };
