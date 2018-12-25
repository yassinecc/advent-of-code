const { parseFile } = require('../../utils/common');
const { part1, part2 } = require('../day3/parts');

const claimsList = parseFile('inputs/day3.txt');

console.log('There are', part1(claimsList), 'overlapping squares');
console.log('Non overlapping claim is', part2(claimsList));
