const { findRegex } = require('../../utils/common');
const Node = require('./Node');

const parseNodeLink = instruction => {
  const parent = findRegex(instruction, /Step\s([A-Z]*?)\s/);
  const child = findRegex(instruction, /step\s([A-Z]*?)\scan\sbegin/);
  return { parent, child };
};

const createNodeLink = (nodeCollection, parentName, childName) => {
  if (!nodeCollection[parentName]) {
    Object.assign(nodeCollection, { [parentName]: new Node(parentName) });
  }
  if (!nodeCollection[childName]) {
    Object.assign(nodeCollection, { [childName]: new Node(childName) });
  }
  const parentNode = nodeCollection[parentName];
  const childNode = nodeCollection[childName];
  parentNode.children.push(childNode);
  childNode.parents.push(parentNode);
};

const createNodeNetwork = (nodeCollection, instructionsList) => {
  instructionsList.forEach(instruction => {
    const { parent, child } = parseNodeLink(instruction);
    createNodeLink(nodeCollection, parent, child);
  });
};

const findNextAvailableNodeNames = nodeCollection => {
  const availableNodes = Object.keys(nodeCollection).filter(nodeKey => {
    const node = nodeCollection[nodeKey];
    return !node.isDone && !node.isProcessing && node.isAvailable;
  });
  const availableNodeNames = availableNodes.map(nodeKey => nodeCollection[nodeKey].name).sort();
  return availableNodeNames;
};

const processAndUpdateNodes = (nodeCollection, nextNodeName) => {
  nodeCollection[nextNodeName].isProcessing = false;
  nodeCollection[nextNodeName].isDone = true;
  Object.keys(nodeCollection)
      .filter(nodeKey => !nodeCollection[nodeKey].isDone)
      .forEach(nodeKey => nodeCollection[nodeKey].updateStatus());
};

const initWorkers = numberOfWorkers =>
  [...Array(numberOfWorkers).keys()].map(key => ({
    id: key,
    step: '.',
    leadTime: 0,
  }));

const getAvailableWorkers = workers => workers.filter(worker => worker.leadTime === 0);

const getNextTimeStep = workers => {
  const sortedWorkers = [...workers.filter(worker => worker.step !== '.')].sort(
      (v, w) => v.leadTime - w.leadTime
  );
  const nextTimeStep = sortedWorkers[0].leadTime;
  return nextTimeStep;
};

const getLeadTime = (nodeName, minimumProcessingTime) => {
  const offset = 'A'.charCodeAt(0) - 1;
  return nodeName.charCodeAt(0) - offset + minimumProcessingTime;
};

const assignStepToWorker = (nodeCollection, minimumProcessingTime, worker, nextNodeName) => {
  nodeCollection[nextNodeName].isProcessing = true;
  worker.step = nextNodeName;
  worker.leadTime = getLeadTime(nextNodeName, minimumProcessingTime);
};

const makeWork = (nodeCollection, worker, nextTimeStep) => {
  worker.leadTime = worker.leadTime - nextTimeStep;
  let workerResult = '';
  let workerTime = 0;
  if (worker.leadTime === 0) {
    workerResult = worker.step;
    processAndUpdateNodes(nodeCollection, worker.step);
    worker.step = '.';
    workerTime = nextTimeStep;
  }
  return { workerResult, workerTime };
};

const runWorkers = (instructionsList, numberOfWorkers = 5, minimumProcessingTime = 60) => {
  const nodeCollection = {};
  createNodeNetwork(nodeCollection, instructionsList);
  Object.keys(nodeCollection).forEach(nodeKey => nodeCollection[nodeKey].updateStatus());
  const workers = initWorkers(numberOfWorkers);
  let result = '';
  let totalTime = 0;
  while (true) {
    if (result.length === Object.keys(nodeCollection).length) break;
    const nextAvailableNodeNames = findNextAvailableNodeNames(nodeCollection);
    const availableWorkers = getAvailableWorkers(workers);
    availableWorkers.forEach((worker, index) => {
      if (index < nextAvailableNodeNames.length) {
        assignStepToWorker(
            nodeCollection,
            minimumProcessingTime,
            worker,
            nextAvailableNodeNames[index]
        );
      }
    });
    const nextTimeStep = getNextTimeStep(workers);
    workers
        .filter(worker => worker.leadTime > 0)
        .forEach(worker => {
          const { workerResult, workerTime } = makeWork(nodeCollection, worker, nextTimeStep);
          result = result + workerResult;
          totalTime = totalTime + workerTime;
        });
  }
  return { result, totalTime };
};

const part1 = instructionsList => runWorkers(instructionsList, 1).result;

const part2 = runWorkers;

module.exports = { parseNodeLink, createNodeNetwork, part1, part2 };
