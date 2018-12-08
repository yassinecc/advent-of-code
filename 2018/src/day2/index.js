const { parseFile } = require('../../utils/parseFile');
const { part1 } = require('../day2/parts');

const wordsList = parseFile('inputs/day2.txt');

console.log('First checksum is', part1(wordsList));
