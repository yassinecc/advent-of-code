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

const findNextAvailableNodeName = nodeCollection => {
  const availableNodes = Object.keys(nodeCollection).filter(nodeKey => {
    const node = nodeCollection[nodeKey];
    return !node.isDone && node.isAvailable;
  });
  const availableNodeNames = availableNodes.map(nodeKey => nodeCollection[nodeKey].name).sort();
  return availableNodeNames[0];
};

const processAndUpdateNodes = (nodeCollection, nextNodeName) => {
  nodeCollection[nextNodeName].isDone = true;
  Object.keys(nodeCollection)
      .filter(nodeKey => !nodeCollection[nodeKey].isDone)
      .forEach(nodeKey => nodeCollection[nodeKey].updateStatus());
};

const part1 = instructionsList => {
  const nodeCollection = {};
  createNodeNetwork(nodeCollection, instructionsList);
  Object.keys(nodeCollection).forEach(nodeKey => nodeCollection[nodeKey].updateStatus());
  let result = '';
  while (true) {
    const nextAvailableNodeName = findNextAvailableNodeName(nodeCollection);
    if (!nextAvailableNodeName) break;
    result = result + nextAvailableNodeName;
    processAndUpdateNodes(nodeCollection, nextAvailableNodeName);
  }
  return result;
};
const part2 = () => 0;
module.exports = { parseNodeLink, createNodeNetwork, part1, part2 };
