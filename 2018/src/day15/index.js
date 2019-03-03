const { parseFile } = require('../../utils/common');
const { part1, part2 } = require('../day15/parts');

const input = parseFile('inputs/day15.txt');

const { completedRounds, totalHp } = part1(input);
console.log(
    'Part 1: Completed rounds:',
    completedRounds,
    ', total HP:',
    totalHp,
    ', outcome:',
    completedRounds * totalHp
);
console.log('Answer to part 2 is', part2(input));
