const maxBy = require('lodash/maxBy');
const Matrix = require('vectorious').Matrix;
const { safeMatrixAccess } = require('../../utils/common');

const gridSize = 300;

const getEnergyTable = serialNumber => {
  const energyTable = new Matrix(gridSize, gridSize);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      energyTable.set(i, j, getEnergyLevel({ x: i, y: j }, serialNumber)); // Array starts at 1
    }
  }
  return energyTable;
};

const getSummedTable = energyTable => {
  const tableSize = energyTable.shape[0];
  const summedTable = new Matrix(tableSize, tableSize);
  for (let i = 0; i < tableSize; i++) {
    for (let j = 0; j < tableSize; j++) {
      summedTable.set(
          i,
          j,
          safeMatrixAccess(summedTable, i - 1, j) +
          safeMatrixAccess(summedTable, i, j - 1) -
          safeMatrixAccess(summedTable, i - 1, j - 1) +
          energyTable.get(i, j)
      );
    }
  }
  return summedTable;
};

const getEnergyLevel = ({ x, y }, serialNumber) => {
  x = x + 1; // Indices start at 1
  y = y + 1;
  const rackId = x + 10;
  const int = (y * rackId + serialNumber) * rackId;
  const hundreds = Math.floor(int / 100) % 10;
  return hundreds - 5;
};

const getAreaEnergyLevel = (summedTable, { x, y }, { z, t }) =>
  safeMatrixAccess(summedTable, z, t) -
  safeMatrixAccess(summedTable, x - 1, t) -
  safeMatrixAccess(summedTable, z, y - 1) +
  safeMatrixAccess(summedTable, x - 1, y - 1);

getMaxPower = function(summedTable, x, y) {
  let result = summedTable.get(x, y);
  let size = 1;
  const num = gridSize - Math.max(x, y);
  for (let i = 1; i < num; i++) {
    const power = getAreaEnergyLevel(summedTable, { x, y }, { z: x + i, t: y + i });
    if (result < power) {
      result = power;
      size = i + 1;
    }
  }
  return { value: result, size };
};

const part1 = serialNumber => {
  const energyTable = getEnergyTable(serialNumber);
  const summedTable = getSummedTable(energyTable);
  const cellSize = 3;
  const array = [];
  for (let i = 0; i < gridSize - cellSize; i++) {
    for (let j = 0; j < gridSize - cellSize; j++) {
      const point = { x: i, y: j };
      const edge = { z: i + cellSize - 1, t: j + cellSize - 1 };
      array.push({
        point,
        value: getAreaEnergyLevel(summedTable, point, edge)
      });
    }
  }
  const { point } = maxBy(array, elt => elt.value);
  return { x: point.x + 1, y: point.y + 1 };
};

const part2 = serialNumber => {
  const energyTable = getEnergyTable(serialNumber);
  const summedTable = getSummedTable(energyTable);
  const array = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const { value, size } = getMaxPower(summedTable, i, j);
      array.push({
        point: { x: i, y: j },
        value,
        size
      });
    }
  }
  const { point, size } = maxBy(array, elt => elt.value);
  return { x: point.x + 1, y: point.y + 1, size };
};

module.exports = {
  getEnergyLevel,
  getAreaEnergyLevel,
  getEnergyTable,
  getSummedTable,
  part1,
  part2
};
