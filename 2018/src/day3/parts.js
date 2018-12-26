const { sum, forEach } = require('lodash');
const { filterInt, findRegex } = require('../../utils/common');
const { initializeArray, arraySum } = require('../../utils/math');

const parseClaim = claimLine => {
  const xStart = filterInt(findRegex(claimLine, /@\s([0-9]*?)\,/));
  const deltaX = filterInt(findRegex(claimLine, /\:\s([0-9]*?)x/));
  const yStart = filterInt(findRegex(claimLine, /\,([0-9]*?)\:/));
  const deltaY = filterInt(findRegex(claimLine, /x([0-9]*?)$/));
  return { xStart, deltaX, yStart, deltaY };
};

const doClaimsIntersect = (claimLine1, claimLine2) => {
  try {
    const [claim1, claim2] = [claimLine1, claimLine2].map(parseClaim);
    const { xStart: x1, yStart: y1, deltaX: dx1, deltaY: dy1 } = claim1;
    const { xStart: x2, yStart: y2, deltaX: dx2, deltaY: dy2 } = claim2;
    return x1 < x2 + dx2 && x1 + dx1 > x2 && y1 < y2 + dy2 && y1 + dy1 > y2;
  } catch (e) {
    console.log('Could not parse inputs', claim1, claim2, e);
    return false;
  }
};

generateArray = (line, gridSize) => {
  const { xStart, deltaX, yStart, deltaY } = parseClaim(line);
  const result = initializeArray(gridSize, 0);
  for (let i = xStart; i < xStart + deltaX; i++) {
    for (let j = yStart; j < yStart + deltaY; j++) {
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

const part2 = claimsList => {
  let result;
  forEach(claimsList, claim => {
    let hasCollided = false;
    forEach(claimsList, concurrentClaim => {
      hasCollided =
        hasCollided || (concurrentClaim !== claim && doClaimsIntersect(claim, concurrentClaim));
    });
    if (!hasCollided) {
      result = claim;
      return false;
    }
  });
  return result;
};

module.exports = { generateArray, doClaimsIntersect, parseClaim, part1, part2 };
