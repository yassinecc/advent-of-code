const { flatten, uniq, sortBy, omit } = require('lodash');

const PLAYER_TYPES = ['E', 'G'];
const INCREMENTS = [{ i: -1, j: 0 }, { i: 0, j: -1 }, { i: 0, j: 1 }, { i: 1, j: 0 }];

const parse2dArray = (input, elvesAttackingPower = 3) => {
  const attackingPower = { E: elvesAttackingPower, G: 3 };
  const result = [];
  [...Array(input.length).keys()].forEach(_ => result.push([]));
  input.forEach((line, i) => {
    [...line].forEach(
        (character, j) =>
          (result[i][j] = PLAYER_TYPES.includes(character)
          ? { type: character, hp: 200, att: attackingPower[character] }
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

const sortPotentialPaths = paths => {
  const sortedPaths = sortBy(paths, path => {
    const lastSquare = path.path[path.path.length - 1];
    return 100000 * path.path.length + 1000 * lastSquare.x + lastSquare.y;
  });
  return sortedPaths[0];
};

// Finds all possible adjacent squares next to reachable opponents as well as the shortest path to them
const getPossibleTargets = (player, map) => {
  if (remainingTeams(map).length < 2) throw Error('No targets found');
  const queue = [];
  const start = { x: player.x, y: player.y, previousSpot: {}, path: [] };
  const opponentType = getOpponentType(map[player.x][player.y].type);
  const possibleTargets = [];
  queue.push(start);
  while (queue.length !== 0) {
    const currentSpot = queue.shift();
    const currentType = map[currentSpot.x][currentSpot.y].type;
    if (currentType === opponentType) {
      possibleTargets.push(currentSpot);
      continue;
    }
    const nextSteps = getNextSteps(opponentType, currentSpot, map);
    nextSteps.forEach(step => {
      const element = map[step.x][step.y];
      if (!element.checked) {
        map[step.x][step.y] = { ...element, checked: element.type !== opponentType };
        queue.push({
          ...step,
          path: currentSpot.path.concat({ x: currentSpot.x, y: currentSpot.y }),
          previousSpot: { x: currentSpot.x, y: currentSpot.y },
        });
      }
    });
  }
  map.forEach((_, i) =>
    _.forEach((_, j) => {
      map[i][j] = omit(map[i][j], 'checked');
    })
  );
  return possibleTargets;
};

const getShortestPath = (player, map) => {
  const potentialPaths = getPossibleTargets(player, map);
  const bestPaths = sortBy(potentialPaths, path => path.path.length);

  if (bestPaths.length === 0) {
    return { ...player, path: [] };
  } else {
    const bestPath = sortPotentialPaths(bestPaths);
    return bestPath;
  }
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
    if (
      potentialOpponent.type === getOpponentType(playerObject.type) &&
      (!opponent || potentialOpponent.hp < opponent.hp)
    ) {
      opponent = { ...potentialOpponent, ...neighbor };
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

const playTurn = (player, map) => {
  if (!PLAYER_TYPES.includes(map[player.x][player.y].type)) return true;
  try {
    const { path } = getShortestPath(player, map);
    let nextCell = player;
    // Nowhere to move
    if (path.length > 1) {
      nextCell = path[1];
      swapCells(map, player, nextCell);
    }
    const closestOpponent = getClosestOpponent(nextCell, map);
    if (closestOpponent) attackOpponent(map, nextCell, closestOpponent);
    return true;
  } catch (error) {
    return false;
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
  const haveAllPlayed = players.map(player => playTurn(player, map));
  return !haveAllPlayed.some(havePlayed => !havePlayed);
};

const remainingTeams = map => {
  const players = flatten(map).filter(item => PLAYER_TYPES.includes(item.type));
  return uniq(players.map(player => player.type));
};

const getTotalHp = map => {
  const players = flatten(map).filter(item => PLAYER_TYPES.includes(item.type));
  const totalHp = players.reduce((acc, player) => acc + player.hp, 0);
  return totalHp;
};

const part1 = (input, elvesAttackingPower = 3) => {
  const map = parse2dArray(input, elvesAttackingPower);
  let completedRounds = 0;
  while (remainingTeams(map).length === 2) {
    const haveAllPlayed = playRound(map);
    if (haveAllPlayed) completedRounds++;
  }
  const totalHp = getTotalHp(map);
  return { completedRounds, totalHp };
};
const part2 = () => 0;
module.exports = {
  PLAYER_TYPES,
  parse2dArray,
  parseMap,
  getNextSteps,
  getPossibleTargets,
  getShortestPath,
  getClosestOpponent,
  playRound,
  part1,
  part2,
};
