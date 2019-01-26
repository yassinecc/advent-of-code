const maxBy = require('lodash/maxBy');

const gridSize = 300;

const getEnergyLevel = ({ x, y }, serialNumber) => {
  const rackId = x + 10;
  const int = (y * rackId + serialNumber) * rackId;
  const hundreds = Math.floor(int / 100) % 10;
  return hundreds - 5;
};
const getAreaEnergyLevel = ({ x, y, s }, serialNumber) => {
  let result = 0;
  for (let i = 0; i < s; i++) {
    for (let j = 0; j < s; j++) {
      result += getEnergyLevel({ x: x + i, y: y + j }, serialNumber);
    }
  }
  return result;
};
const part1 = serialNumber => {
  const cellSize = 3;
  const array = [];
  for (let x = 1; x < gridSize + 2 - cellSize; x++) {
    for (let y = 1; y < gridSize + 2 - cellSize; y++) {
      const point = { x, y, s: cellSize };
      array.push({
        point,
        value: getAreaEnergyLevel(point, serialNumber),
      });
    }
  }
  const maxObject = maxBy(array, elt => elt.value);
  return maxObject.point;
};
const part2 = () => 0;
module.exports = { getEnergyLevel, getAreaEnergyLevel, part1, part2 };
