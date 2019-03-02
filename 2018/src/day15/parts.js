const Matrix = require('vectorious').Matrix;

const { safeMatrixAccess } = require('../../utils/common');

const parseMap = input => {
  const result = new Matrix(input.length, input[0].length);
  input.forEach((line, i) => {
    [...line].forEach((character, j) => result.set(i, j, character.charCodeAt(0)));
  });
  return result;
};

const getNextSteps = (spot, map) => {
  const results = [];
  const increments = [{ i: -1, j: 0 }, { i: 0, j: -1 }, { i: 0, j: 1 }, { i: 1, j: 0 }];
  increments.forEach(increment => {
    const potential = { x: spot.x + increment.i, y: spot.y + increment.j };
    const item = safeMatrixAccess(map, potential.x, potential.y);
    if (String.fromCharCode(item) !== '#') results.push(potential);
  });
  return results;
};

const getShortestPath = (player, goal, map) => {
  const queue = [];
  const start = { x: player.x, y: player.y, path: [] };
  queue.push(start);
  while (queue.length !== 0) {
    const currentSpot = queue.shift();
    if (currentSpot.x === goal.x && currentSpot.y === goal.y) {
      return currentSpot;
    }
    const nextSteps = getNextSteps(currentSpot, map);
    nextSteps.forEach(step => {
      const element = safeMatrixAccess(map, step.x, step.y);
      if (!element.checked) {
        map.set(step.x, step.y, { ...element, checked: true });
        queue.push({
          ...step,
          path: currentSpot.path.concat({ x: currentSpot.x, y: currentSpot.y }),
        });
      }
    });
  }
};

const part1 = () => 0;
const part2 = () => 0;
module.exports = { parseMap, getNextSteps, getShortestPath, part1, part2 };
