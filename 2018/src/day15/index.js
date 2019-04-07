const { parseFile } = require('../../utils/common');
const { part1, part2 } = require('../day15/parts');

const input = parseFile('inputs/day15.txt');

const writeResult = (part, rounds, hp) =>
  console.log(
      `Part ${part}: Completed rounds:`,
      rounds,
      ', total HP:',
      hp,
      ', outcome:',
      rounds * hp
  );

const { completedRounds, totalHp } = part1(input);
writeResult(1, completedRounds, totalHp);
const { fightCompletedRounds, fightFinalHp } = part2(input);
writeResult(2, fightCompletedRounds, fightFinalHp);
