const { parseFile } = require('../../utils/common');
const { part1, part2 } = require('../day11/parts');

const input = parseFile('inputs/day11.txt');

console.log('Maximal coordinate is', `${part1(input[0]).x},${part1(input[0]).y}`);
console.log('Answer to part 2 is', part2(input));
