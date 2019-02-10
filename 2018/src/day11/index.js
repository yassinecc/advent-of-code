const { parseFile } = require('../../utils/common');
const { part1, part2 } = require('../day11/parts');

const [serialNumber] = parseFile('inputs/day11.txt');

const firstPoint = part1(serialNumber);

const secondPoint = part2(serialNumber);

console.log('Maximal coordinate is', `${firstPoint.x},${firstPoint.y}`);
console.log(
    'Maximal coordinate for all sizes is',
    `${secondPoint.x},${secondPoint.y},${secondPoint.size}`
);
