const sum = require('lodash/sum');
const { parseFile } = require('../utils/parseFile');

const frequenciesList = parseFile('inputs/day1.txt');
console.log('Sum of all frequencies is', sum(frequenciesList));
