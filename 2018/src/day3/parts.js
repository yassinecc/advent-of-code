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

const doClaimsIntersect = (claim1, claim2) => {
  try {
    const { xStart: x1, yStart: y1, deltaX: dx1, deltaY: dy1 } = claim1;
    const { xStart: x2, yStart: y2, deltaX: dx2, deltaY: dy2 } = claim2;
    return x1 < x2 + dx2 && x1 + dx1 > x2 && y1 < y2 + dy2 && y1 + dy1 > x2;
  } catch (e) {
    console.log('Could not parse inputs', claim1, claim2, e);
    return false;
  }
};

generateArray = (line, gridSize) => {
  const { xStart, deltaX, yStart, deltaY } = parseClaim(line);
  const result = initializeArray(gridSize, 0);
  for (var i = xStart; i < xStart + deltaX; i++) {
    for (var j = yStart; j < yStart + deltaY; j++) {
      result.set(i, j, 1);
    }
  }
  return result;
};

const part1 = (claimsList, gridSize = 1000) => {
  let result = initializeArray(gridSize, 0);
  claimsList.forEach(claim => {
    result = arraySum(result, generateArray(claim, gridSize));
  });
  return result.reduce((a, b) => (b > 1 ? a + 1 : a));
};

const part2 = () => {
  return 0;
};

module.exports = { generateArray, doClaimsIntersect, parseClaim, part1, part2 };
