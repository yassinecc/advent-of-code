const { parseFile } = require('../../utils/common');
const { part1, part2 } = require('../day11/parts');

const input = parseFile('inputs/day11.txt');

console.log('Answer to part 1 is', part1(input));
console.log('Answer to part 2 is', part2(input));
