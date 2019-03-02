const parse2dArray = input => {
  const result = [];
  [...Array(input.length).keys()].forEach(_ => result.push([]));
  input.forEach((line, i) => {
    [...line].forEach((character, j) => (result[i][j] = { type: character }));
  });
  return result;
};

const getNextSteps = (spot, map) => {
  const results = [];
  const increments = [{ i: -1, j: 0 }, { i: 0, j: -1 }, { i: 0, j: 1 }, { i: 1, j: 0 }];
  increments.forEach(increment => {
    const potential = { x: spot.x + increment.i, y: spot.y + increment.j };
    const { type } = map[potential.x][potential.y];
    if (type !== '#') results.push(potential);
  });
  return results;
};

const getOpponentType = playerType => {
  switch (playerType) {
    case 'G':
      return 'E';
    case 'E':
      return 'G';
    default:
      return '*';
  }
};

const getShortestPath = (player, map) => {
  const queue = [];
  const start = { x: player.x, y: player.y, path: [] };
  const opponentType = getOpponentType(map[player.x][player.y].type);
  queue.push(start);
  while (queue.length !== 0) {
    const currentSpot = queue.shift();
    const currentType = map[currentSpot.x][currentSpot.y].type;
    if (currentType === opponentType) {
      return currentSpot;
    }
    const nextSteps = getNextSteps(currentSpot, map);
    nextSteps.forEach(step => {
      const element = map[step.x][step.y];
      if (!element.checked) {
        map[step.x][step.y] = { ...element, checked: true };
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
module.exports = { parse2dArray, getNextSteps, getShortestPath, part1, part2 };
