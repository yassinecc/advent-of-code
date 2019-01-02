const { parseFile } = require('../../utils/common');
const { part1, part2 } = require('../day8/parts');

const input = parseFile('inputs/day8.txt');

const file = input[0].split(' ').map(Number);

console.log('Sum of metadata entries is', part1(file).value);
console.log('Root cell value is', part2(file));
