const parse2dArray = input => {
  const result = [];
  [...Array(input.length).keys()].forEach(_ => result.push([]));
  input.forEach((line, i) => {
    [...line].forEach((character, j) => (result[i][j] = { item: character.charCodeAt(0) }));
  });
  return result;
};

const getNextSteps = (spot, map) => {
  const results = [];
  const increments = [{ i: -1, j: 0 }, { i: 0, j: -1 }, { i: 0, j: 1 }, { i: 1, j: 0 }];
  increments.forEach(increment => {
    const potential = { x: spot.x + increment.i, y: spot.y + increment.j };
    const { item } = map[potential.x][potential.y];
    if (String.fromCharCode(item) !== '#') results.push(potential);
  });
  return results;
};

const getOpponentItem = playerItem => {
  const playerType = String.fromCharCode(playerItem);
  let opponentType;
  switch (playerType) {
    case 'G':
      opponentType = 'E';
      break;
    case 'E':
      opponentType = 'G';
      break;
    default:
      opponentType = '*';
      break;
  }
  return opponentType.charCodeAt(0);
};

const getShortestPath = (player, map) => {
  const queue = [];
  const start = { x: player.x, y: player.y, path: [] };
  const opponentItem = getOpponentItem(map[player.x][player.x].item);
  queue.push(start);
  while (queue.length !== 0) {
    const currentSpot = queue.shift();
    const currentItem = map[currentSpot.x][currentSpot.y].item;
    if (currentItem === opponentItem) {
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
