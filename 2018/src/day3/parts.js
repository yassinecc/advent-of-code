const { sum } = require('lodash');
const { filterInt, findRegex } = require('../../utils/common');
const { initializeArray, arraySum } = require('../../utils/math');

const parseClaim = claimLine => {
  const yStart = filterInt(findRegex(claimLine, /@\s([0-9]*?)\,/));
  const deltaY = filterInt(findRegex(claimLine, /\:\s([0-9]*?)x/));
  const xStart = filterInt(findRegex(claimLine, /\,([0-9]*?)\:/));
  const deltaX = filterInt(findRegex(claimLine, /x([0-9]*?)$/));
  return { xStart, deltaX, yStart, deltaY };
};

generateArray = (line, gridSize) => {
  const { xStart, deltaX, yStart, deltaY } = parseClaim(line);
  const result = initializeArray(gridSize, 0);
  for (var i = xStart; i < xStart + deltaX; i++) {
    for (var j = yStart; j < yStart + deltaY; j++) {
      result[i][j] = 1;
    }
  }
  return result;
};

const part1 = (claimsList, gridSize = 1000) => {
  let result = initializeArray(gridSize, 0);
  claimsList.forEach((claim, index) => {
    result = arraySum(result, generateArray(claim, gridSize));
  });
  countArray = result.map(line => {
    return line.filter(cell => cell > 1).length;
  });
  return sum(countArray);
};

const part2 = () => {
  return 0;
};

module.exports = { generateArray, parseClaim, part1, part2 };
