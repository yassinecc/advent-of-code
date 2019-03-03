const { omit } = require('lodash');

const PLAYER_TYPES = ['E', 'G'];
const INCREMENTS = [{ i: -1, j: 0 }, { i: 0, j: -1 }, { i: 0, j: 1 }, { i: 1, j: 0 }];

const parse2dArray = input => {
  const result = [];
  [...Array(input.length).keys()].forEach(_ => result.push([]));
  input.forEach((line, i) => {
    [...line].forEach(
        (character, j) =>
          (result[i][j] = PLAYER_TYPES.includes(character)
          ? { type: character, hp: 200, att: 3 }
          : { type: character })
    );
  });
  return result;
};

const parseMap = playerMap =>
  playerMap.map(playerMapRow => playerMapRow.reduce((acc, player) => acc + player.type, ''));

const getNextSteps = (opponentType, spot, map) => {
  const results = [];
  INCREMENTS.forEach(increment => {
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
      map.forEach((_, i) =>
        _.forEach(({ type }, j) => {
          const rest = omit(map[i][j], 'checked');
          map[i][j] = rest;
        })
      );
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

const getClosestOpponent = (player, map) => {
  let opponent;
  INCREMENTS.forEach(increment => {
    const neighbor = { x: player.x + increment.i, y: player.y + increment.j };
    const playerObject = map[player.x][player.y];
    const potentialOpponent = map[neighbor.x][neighbor.y];
    if (potentialOpponent.type === getOpponentType(playerObject.type)) {
      if (!opponent || potentialOpponent.hp < opponent.hp) {
        opponent = { ...potentialOpponent, ...neighbor };
      }
    }
  });
  return opponent;
};

const attackOpponent = (map, player, closestOpponent) => {
  const opponentData = map[closestOpponent.x][closestOpponent.y];
  const attackPower = map[player.x][player.y].att;
  const newHp = opponentData.hp - attackPower;
  map[closestOpponent.x][closestOpponent.y] =
    newHp > 0 ? { ...opponentData, hp: newHp } : { type: '.' };
};

const attackCloseNeighbor = (player, map) => {
  const closestOpponent = getClosestOpponent(player, map);
  if (closestOpponent) attackOpponent(map, player, closestOpponent);
};

const playTurn = (player, map) => {
  const { path } = getShortestPath(player, map);
  let nextCell = player;
  // Nowhere to move
  if (path.length > 1) {
    nextCell = path[1];
    swapCells(map, player, nextCell);
  }
  attackCloseNeighbor(nextCell, map);
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
module.exports = {
  PLAYER_TYPES,
  parse2dArray,
  parseMap,
  getNextSteps,
  getShortestPath,
  getClosestOpponent,
  playRound,
  part1,
  part2,
};
