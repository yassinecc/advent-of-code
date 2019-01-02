const { parseFile } = require('../../utils/common');
const { part1, part2 } = require('../day7/parts');

const input = parseFile('inputs/day7.txt');

console.log('The final word with 1 worker is', part1(input));
console.log('Total time with 5 workers is', part2(input).totalTime);
