const { parseFile } = require('../../utils/common');
const { part1, part2 } = require('../day{{dayNumber}}/parts');

const input = parseFile('inputs/day{{dayNumber}}.txt');

console.log('Answer to part 1 is', part1(input));
console.log('Answer to part 2 is', part2(input));
