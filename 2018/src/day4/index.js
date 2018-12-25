const { parseFile } = require('../../utils/common');
const { part1, part2 } = require('../day4/parts');

const log = parseFile('inputs/day4.txt');

console.log('Answer to part 1 is', part1(log));
