const { findRegex } = require('../../utils/common');
const Node = require('./Node');

const MINIMUM_PROCESSING_TIME = 0;

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
    return !node.isDone && node.isAvailable;
  });
  const availableNodeNames = availableNodes.map(nodeKey => nodeCollection[nodeKey].name).sort();
  return availableNodeNames;
};

const processAndUpdateNodes = (nodeCollection, nextNodeName) => {
  nodeCollection[nextNodeName].isDone = true;
  Object.keys(nodeCollection)
      .filter(nodeKey => !nodeCollection[nodeKey].isDone)
      .forEach(nodeKey => nodeCollection[nodeKey].updateStatus());
};

const getAvailableWorkers = workers => workers.filter(worker => worker.leadTime === 0);

const getNextTimeStep = workers => {
  const sortedWorkers = [...workers].sort((v, w) => v.leadTime - w.leadTime);
  const nextTimeStep = sortedWorkers[0].leadTime;
  return nextTimeStep;
};

const getLeadTime = nodeName => {
  const offset = 'A'.charCodeAt(0) - 1;
  return nodeName.charCodeAt(0) - offset + MINIMUM_PROCESSING_TIME;
};

const part1 = instructionsList => {
  const nodeCollection = {};
  createNodeNetwork(nodeCollection, instructionsList);
  Object.keys(nodeCollection).forEach(nodeKey => nodeCollection[nodeKey].updateStatus());
  let result = '';
  while (true) {
    const nextAvailableNodeName = findNextAvailableNodeNames(nodeCollection)[0];
    if (!nextAvailableNodeName) break;
    result = result + nextAvailableNodeName;
    processAndUpdateNodes(nodeCollection, nextAvailableNodeName);
  }
  return result;
};
const part2 = instructionsList => {
  const NUMBER_OF_WORKERS = 5;
  const nodeCollection = {};
  createNodeNetwork(nodeCollection, instructionsList);
  Object.keys(nodeCollection).forEach(nodeKey => nodeCollection[nodeKey].updateStatus());
  const workers = [...Array(NUMBER_OF_WORKERS).keys()].map(key => ({
    id: key,
    step: '.',
    leadTime: 0,
  }));
  let result = '';
  let totalTime = 0;
  while (true) {
    const nextAvailableNodeNames = findNextAvailableNodeNames(nodeCollection);
    if (nextAvailableNodeNames.length === 0) break;
    const availableWorkers = getAvailableWorkers(workers);
    const processedNodeNames = [];
    availableWorkers.forEach((worker, index) => {
      if (index < nextAvailableNodeNames.length) {
        const nextNodeName = nextAvailableNodeNames[index];
        worker.step = nextNodeName;
        worker.leadTime = getLeadTime(nextNodeName);
        processedNodeNames.push(worker.step);
      }
    });
    const nextTimeStep = getNextTimeStep(workers);
    workers
        .filter(worker => worker.leadTime > 0)
        .forEach(worker => {
          worker.leadTime = worker.leadTime - nextTimeStep;
          totalTime = totalTime + nextTimeStep;
        });
    processedNodeNames.forEach(nodeName => {
      result = result + nodeName;
      processAndUpdateNodes(nodeCollection, nodeName);
    });
  }
  console.log('totalTime', totalTime);
  return result;
};
module.exports = { parseNodeLink, createNodeNetwork, part1, part2 };
