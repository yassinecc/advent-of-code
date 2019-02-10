const maxBy = require('lodash/maxBy');

const gridSize = 300;

const getEnergyLevel = ({ x, y }, serialNumber) => {
  const rackId = x + 10;
  const int = (y * rackId + serialNumber) * rackId;
  const hundreds = Math.floor(int / 100) % 10;
  return hundreds - 5;
};
const getAreaEnergyLevel = ({ x, y }, { z, t }, serialNumber) => {
  let result = 0;
  for (let i = 0; i < z - x; i++) {
    for (let j = 0; j < t - y; j++) {
      result += getEnergyLevel({ x: x + i, y: y + j }, serialNumber);
    }
  }
  return result;
};
const part1 = serialNumber => {
  const cellSize = 3;
  const array = [];
  for (let i = 1; i < gridSize + 2 - cellSize; i++) {
    for (let j = 1; j < gridSize + 2 - cellSize; j++) {
      const point = { x: i, y: j };
      const edge = { z: i + cellSize, t: j + cellSize };
      array.push({
        point,
        value: getAreaEnergyLevel(point, edge, serialNumber),
      });
    }
  }
  const maxObject = maxBy(array, elt => elt.value);
  return maxObject.point;
};
const part2 = () => 0;
module.exports = { getEnergyLevel, getAreaEnergyLevel, part1, part2 };
