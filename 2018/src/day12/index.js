const { parseFile } = require('../../utils/common');
const { part1, part2 } = require('../day12/parts');

const input = parseFile('inputs/day12.txt');

console.log('Sum of pots numbers is', part1(input));
console.log('Answer to part 2 is', part2(input));
