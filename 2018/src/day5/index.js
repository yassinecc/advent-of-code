const { parseFile } = require('../../utils/common');
const { part1, part2 } = require('../day5/parts');

const word = parseFile('inputs/day5.txt');

console.log("Final polymer's length is", part1(word[0]));
