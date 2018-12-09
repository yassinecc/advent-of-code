const { parseFile } = require('../../utils/parseFile');
const { part1, part2 } = require('../day2/parts');

const wordsList = parseFile('inputs/day2.txt');

console.log('First checksum is', part1(wordsList));
console.log('Common letters are', part2(wordsList));
