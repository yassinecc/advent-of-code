const PLAYER_TYPES = ['E', 'G'];

const parse2dArray = input => {
  const result = [];
  [...Array(input.length).keys()].forEach(_ => result.push([]));
  input.forEach((line, i) => {
    [...line].forEach((character, j) => (result[i][j] = { type: character }));
  });
  return result;
};

const parseMap = playerMap =>
  playerMap.map(playerMapRow => playerMapRow.reduce((acc, player) => acc + player.type, ''));

const getNextSteps = (opponentType, spot, map) => {
  const results = [];
  const increments = [{ i: -1, j: 0 }, { i: 0, j: -1 }, { i: 0, j: 1 }, { i: 1, j: 0 }];
  increments.forEach(increment => {
    const potential = { x: spot.x + increment.i, y: spot.y + increment.j };
    const { type } = map[potential.x][potential.y];
    if (type === '.' || type === opponentType) results.push(potential);
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
      map.forEach((_, i) => _.forEach(({ type }, j) => (map[i][j] = { type })));
      return currentSpot;
    }
    const nextSteps = getNextSteps(opponentType, currentSpot, map);
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
  return { ...player, path: [] };
};

const swapCells = (map, firstCell, secondCell) => {
  const nextCellValue = map[secondCell.x][secondCell.y];
  map[secondCell.x][secondCell.y] = map[firstCell.x][firstCell.y];
  map[firstCell.x][firstCell.y] = nextCellValue;
};

const playTurn = (player, map) => {
  const { path } = getShortestPath(player, map);
  // Not next to opponent
  if (path.length > 1) {
    const nextCell = path[1];
    swapCells(map, player, nextCell);
  }
};

const playRound = map => {
  const players = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      const cell = map[i][j];
      if (PLAYER_TYPES.includes(cell.type)) {
        players.push({ x: i, y: j });
      }
    }
  }
  players.forEach(player => playTurn(player, map));
};

const part1 = () => 0;
const part2 = () => 0;
module.exports = { parse2dArray, parseMap, getNextSteps, getShortestPath, playRound, part1, part2 };
