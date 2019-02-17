const { parseFile } = require('../../utils/common');
const { part1, part2 } = require('../day14/parts');

const input = parseFile('inputs/day14.txt');

console.log('Answer to part 1 is', part1(input[0]));
console.log('Answer to part 2 is', part2(input));
