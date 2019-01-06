const { findRegex } = require('../../utils/common');
const Node = require('../../utils/Node');

const parseInput = input => {
  const numberOfPlayers = Number(findRegex(input, /^([0-9]+)/g));
  const maxPoints = Number(findRegex(input, /([0-9]+)\spoints/g));
  return { numberOfPlayers, maxPoints };
};

const insertMarble = (marbleObject, value) => {
  const marble = marbleObject.marble;
  if (value % 23 !== 0) {
    const newMarble = new Node(value);
    const leftMarble = marble.right;
    const rightMarble = leftMarble.right;
    newMarble.left = leftMarble;
    newMarble.right = rightMarble;
    leftMarble.right = newMarble;
    rightMarble.left = newMarble;
    return { marble: newMarble, score: 0 };
  }
  let toRemove = marble;
  [...Array(7).keys()].forEach(_ => {
    toRemove = toRemove.left;
  });
  toRemove.left.right = toRemove.right;
  toRemove.right.left = toRemove.left;
  return { marble: toRemove.right, score: value + toRemove.value };
};

const part1 = (input, multiplier = 1) => {
  const { numberOfPlayers, maxPoints } = parseInput(input);
  const firstMarble = new Node(0);
  firstMarble.left = firstMarble;
  firstMarble.right = firstMarble;
  let currentMarble = { marble: firstMarble, score: 0 };
  const scores = [...Array(numberOfPlayers).keys()].map(_ => 0);
  for (let i = 0; i < multiplier * maxPoints; i++) {
    const marble = insertMarble(currentMarble, i + 1);
    const scoreIndex = i % numberOfPlayers;
    scores[scoreIndex] += marble.score;
    currentMarble = marble;
  }
  return Math.max(...scores);
};

const part2 = input => part1(input, 100);
module.exports = { parseInput, insertMarble, part1, part2 };
