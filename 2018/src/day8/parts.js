const Cell = require('../../utils/Cell');

const fillMetadata = (file, result, metadataInfo, cellInfo) => {
  const { metadataIndex, number } = metadataInfo;
  const { cellCollection, cellName } = cellInfo;
  [...Array(number).keys()].forEach(index => {
    const metadataValue = file[metadataIndex + index];
    cellCollection[cellName].metadata.push(metadataValue);
    result.value += metadataValue;
  });
  return metadataIndex + number;
};

const fillCell = (cellCollection, file, headerIndex = 0, result = { value: 0 }, parentName) => {
  const cellNames = Object.keys(cellCollection).map(Number);
  const nextCellName = cellNames.length > 0 ? Math.max(...cellNames) + 1 : 0;
  Object.assign(cellCollection, { [nextCellName]: new Cell(nextCellName) });
  if (parentName > -1) {
    cellCollection[nextCellName].parents.push(parentName);
    cellCollection[parentName].children.push(nextCellName);
  }
  const numberOfChildren = file[headerIndex];
  const metadataIndex = headerIndex + 1;
  const numberOfMetadata = file[headerIndex + 1];
  const cellInfo = { cellCollection, cellName: nextCellName };
  if (numberOfChildren === 0) {
    const metadataInfo = { metadataIndex: metadataIndex + 1, number: numberOfMetadata };
    return fillMetadata(file, result, metadataInfo, cellInfo);
  }
  let childHeaderIndex = headerIndex + 2;
  [...Array(numberOfChildren).keys()].forEach(index => {
    childHeaderIndex = fillCell(cellCollection, file, childHeaderIndex, result, nextCellName);
  });

  const metadataInfo = { metadataIndex: childHeaderIndex, number: numberOfMetadata };
  return fillMetadata(file, result, metadataInfo, cellInfo);
};

const getCellValue = (cellCollection, cellName) => {
  const currentCell = cellCollection[cellName];
  if (!currentCell) return 0;
  let reducer = () => 0;
  if (currentCell.children.length === 0) {
    reducer = (acc, value) => acc + value;
  } else {
    reducer = (acc, value) => {
      const childCellName = currentCell.children[value - 1];
      const cellValue = getCellValue(cellCollection, childCellName);
      return acc + cellValue;
    };
  }
  return currentCell.metadata.reduce(reducer, 0);
};

const part1 = file => {
  const result = { value: 0 };
  fillCell({}, file, 0, result);
  return result;
};
const part2 = file => {
  const cellCollection = {};
  fillCell(cellCollection, file);
  return getCellValue(cellCollection, 0);
};
module.exports = { fillCell, getCellValue, part1, part2 };
