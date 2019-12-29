const { findRegex } = require('../../utils/common');
const Cell = require('../../utils/Cell');

const parseCellLink = instruction => {
  const parent = findRegex(instruction, /Step\s([A-Z]*?)\s/g);
  const child = findRegex(instruction, /step\s([A-Z]*?)\scan\sbegin/g);
  return { parent, child };
};

const createCellLink = (cellCollection, parentName, childName) => {
  if (!cellCollection[parentName]) {
    Object.assign(cellCollection, { [parentName]: new Cell(parentName) });
  }
  if (!cellCollection[childName]) {
    Object.assign(cellCollection, { [childName]: new Cell(childName) });
  }
  const parentCell = cellCollection[parentName];
  const childCell = cellCollection[childName];
  parentCell.children.push(childCell);
  childCell.parents.push(parentCell);
};

const createCellNetwork = (cellCollection, instructionsList) => {
  instructionsList.forEach(instruction => {
    const { parent, child } = parseCellLink(instruction);
    createCellLink(cellCollection, parent, child);
  });
};

const findNextAvailableCellNames = cellCollection => {
  const availableCells = Object.keys(cellCollection).filter(cellKey => {
    const cell = cellCollection[cellKey];
    return !cell.isDone && !cell.isProcessing && cell.isAvailable;
  });
  const availableCellNames = availableCells.map(cellKey => cellCollection[cellKey].name).sort();
  return availableCellNames;
};

const processAndUpdateCells = (cellCollection, nextCellName) => {
  cellCollection[nextCellName].isProcessing = false;
  cellCollection[nextCellName].isDone = true;
  Object.keys(cellCollection)
      .filter(cellKey => !cellCollection[cellKey].isDone)
      .forEach(cellKey => cellCollection[cellKey].updateStatus());
};

const initWorkers = numberOfWorkers =>
  [...Array(numberOfWorkers).keys()].map(key => ({
    id: key,
    step: '.',
    leadTime: 0
  }));

const getAvailableWorkers = workers => workers.filter(worker => worker.leadTime === 0);

const getNextTimeStep = workers => {
  const sortedWorkers = [...workers.filter(worker => worker.step !== '.')].sort(
      (v, w) => v.leadTime - w.leadTime
  );
  const nextTimeStep = sortedWorkers[0].leadTime;
  return nextTimeStep;
};

const getLeadTime = (cellName, minimumProcessingTime) => {
  const offset = 'A'.charCodeAt(0) - 1;
  return cellName.charCodeAt(0) - offset + minimumProcessingTime;
};

const assignStepToWorker = (cellCollection, minimumProcessingTime, worker, nextCellName) => {
  cellCollection[nextCellName].isProcessing = true;
  worker.step = nextCellName;
  worker.leadTime = getLeadTime(nextCellName, minimumProcessingTime);
};

const makeWork = (cellCollection, worker, nextTimeStep) => {
  worker.leadTime = worker.leadTime - nextTimeStep;
  let workerResult = '';
  let workerTime = 0;
  if (worker.leadTime === 0) {
    workerResult = worker.step;
    processAndUpdateCells(cellCollection, worker.step);
    worker.step = '.';
    workerTime = nextTimeStep;
  }
  return { workerResult, workerTime };
};

const runWorkers = (instructionsList, numberOfWorkers = 5, minimumProcessingTime = 60) => {
  const cellCollection = {};
  createCellNetwork(cellCollection, instructionsList);
  Object.keys(cellCollection).forEach(cellKey => cellCollection[cellKey].updateStatus());
  const workers = initWorkers(numberOfWorkers);
  let result = '';
  let totalTime = 0;
  while (true) {
    if (result.length === Object.keys(cellCollection).length) break;
    const nextAvailableCellNames = findNextAvailableCellNames(cellCollection);
    const availableWorkers = getAvailableWorkers(workers);
    availableWorkers.forEach((worker, index) => {
      if (index < nextAvailableCellNames.length) {
        assignStepToWorker(
            cellCollection,
            minimumProcessingTime,
            worker,
            nextAvailableCellNames[index]
        );
      }
    });
    const nextTimeStep = getNextTimeStep(workers);
    workers
        .filter(worker => worker.leadTime > 0)
        .forEach(worker => {
          const { workerResult, workerTime } = makeWork(cellCollection, worker, nextTimeStep);
          result = result + workerResult;
          totalTime = totalTime + workerTime;
        });
  }
  return { result, totalTime };
};

const part1 = instructionsList => runWorkers(instructionsList, 1).result;

const part2 = runWorkers;

module.exports = { parseCellLink, createCellNetwork, part1, part2 };
