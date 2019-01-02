const { parseFile } = require('../../utils/common');
const { part1, part2 } = require('../day8/parts');

const input = parseFile('inputs/day8.txt');

console.log('Sum of metadata entries is', part1(input).value);
console.log('Answer to part 2 is', part2(input));
