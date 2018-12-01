const { part1, part2 } = require('./parts');
const { parseFile } = require('../../utils/parseFile');

const frequenciesList = parseFile('inputs/day1.txt');

console.log('Sum of all frequencies is', part1(frequenciesList));
console.log('First duplicate element is', part2(frequenciesList));
