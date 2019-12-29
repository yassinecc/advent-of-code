const { zipWith } = require('lodash');

const { parseInput, insertMarble, part1 } = require('../parts');
const Node = require('../../../utils/Node');

const testInputs = [
  '9 players; last marble is worth 25 points',
  '10 players; last marble is worth 1618 points',
  '13 players; last marble is worth 7999 points',
  '17 players; last marble is worth 1104 points',
  '21 players; last marble is worth 6111 points',
  '30 players; last marble is worth 5807 points'
];
const testMaxScores = [32, 8317, 146373, 2764, 54718, 37305];

describe('Day 9', () => {
  it('should correctly parse an input', () => {
    expect(parseInput('478 players; last marble is worth 71240 points')).toEqual({
      numberOfPlayers: 478,
      maxPoints: 71240
    });
  });

  it('should solve part 1', () => {
    zipWith(testInputs, testMaxScores, (testInput, testMaxScore) => {
      const maxScore = part1(testInput);
      expect(maxScore).toEqual(testMaxScore);
    });
  });

  it('should insert marbles', () => {
    const marbles = new Node(0);
    marbles.left = marbles;
    marbles.right = marbles;
    let nextNode = insertMarble({ marble: marbles, score: 0 }, 1);
    nextNode = insertMarble(nextNode, 2);
    nextNode = insertMarble(nextNode, 3);
    nextNode = insertMarble(nextNode, 4);
    const finalMarble = nextNode.marble;
    expect(finalMarble.right.value).toEqual(2);
    expect(finalMarble.right.right.value).toEqual(1);
    expect(finalMarble.right.right.right.value).toEqual(3);
    expect(finalMarble.right.right.right.right.value).toEqual(0);
  });
});
