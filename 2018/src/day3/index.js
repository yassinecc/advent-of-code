const { parseFile } = require('../../utils/common');
const { part1, part2 } = require('../day3/parts');

const claimsList = parseFile('inputs/day3.txt');

console.log('part1(claimsList)', part1(claimsList));
