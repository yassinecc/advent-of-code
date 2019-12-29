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

const padInput = ({ input, minIndex }) => {
  const start = input.indexOf('1');
  const end = input.lastIndexOf('1');
  return {
    paddedInput: `00000${input.slice(start, end + 1)}00000`,
    minIndex: minIndex - 5 + start
  };
};

const spreadPlants = (plantState, spreadRules) => {
  const { paddedInput, minIndex } = padInput(plantState);
  const plantsLength = paddedInput.length;
  const plantsArray = [0, 0];
  for (let i = 2; i < plantsLength - 3; i++) {
    const neighbours = paddedInput.slice(i - 2, i + 3);
    const index = parseInt(neighbours, 2);
    plantsArray.push(spreadRules[index] || 0);
  }
  plantsArray.push(0, 0);
  return { input: plantsArray.join(''), minIndex };
};

const countPotsNumber = ({ input, minIndex }) => {
  let counter = 0;
  input.split('').forEach((char, index) => {
    if (char === '1') counter = counter + index + minIndex;
  });
  return counter;
};

const getLinearPotsNumberDiff = (plantState, spreadRules) => {
  let index = 0;
  let potsNumber = 0;
  let potsNumberDiff = 1;
  while (true) {
    index++;
    plantState = spreadPlants(plantState, spreadRules);
    const newPotsNumber = countPotsNumber(plantState);
    const newDiff = newPotsNumber - potsNumber;
    if (newDiff === potsNumberDiff) {
      return { diff: newPotsNumber - potsNumber, index, newPotsNumber };
    } else {
      potsNumber = newPotsNumber;
      potsNumberDiff = newDiff;
    }
  }
};

const part1 = input => {
  let plantState = { input: getInitialState(input[0]), minIndex: 0 };
  const rulesString = input.slice(2).join('\n');
  const spreadRules = getSpreadRules(rulesString);
  for (let i = 0; i < 20; i++) {
    plantState = spreadPlants(plantState, spreadRules);
  }
  return countPotsNumber(plantState);
};
const part2 = input => {
  const plantState = { input: getInitialState(input[0]), minIndex: 0 };
  const rulesString = input.slice(2).join('\n');
  const spreadRules = getSpreadRules(rulesString);
  const { diff, index, newPotsNumber } = getLinearPotsNumberDiff(plantState, spreadRules);
  return newPotsNumber + diff * (50000000000 - index);
};

module.exports = {
  convertInput,
  getInitialState,
  getSpreadRules,
  padInput,
  spreadPlants,
  countPotsNumber,
  part1,
  part2
};
