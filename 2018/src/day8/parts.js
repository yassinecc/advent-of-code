const Node = require('../../utils/Node');

const fillMetadata = (file, result, metadataInfo, nodeInfo) => {
  const { metadataIndex, number } = metadataInfo;
  const { nodeCollection, nodeName } = nodeInfo;
  [...Array(number).keys()].forEach(index => {
    const metadataValue = file[metadataIndex + index];
    nodeCollection[nodeName].metadata.push(metadataValue);
    result.value += metadataValue;
  });
  return metadataIndex + number;
};

const fillNode = (nodeCollection, file, headerIndex, result = { value: 0 }, parentName) => {
  const nodeNames = Object.keys(nodeCollection).map(Number);
  const nextNodeName = nodeNames.length > 0 ? Math.max(...nodeNames) + 1 : 0;
  Object.assign(nodeCollection, { [nextNodeName]: new Node(nextNodeName) });
  if (parentName > -1) {
    nodeCollection[nextNodeName].parents.push(parentName);
    nodeCollection[parentName].children.push(nextNodeName);
  }
  const numberOfChildren = file[headerIndex];
  const metadataIndex = headerIndex + 1;
  const numberOfMetadata = file[headerIndex + 1];
  const nodeInfo = { nodeCollection, nodeName: nextNodeName };
  if (numberOfChildren === 0) {
    const metadataInfo = { metadataIndex: metadataIndex + 1, number: numberOfMetadata };
    return fillMetadata(file, result, metadataInfo, nodeInfo);
  }
  let childHeaderIndex = headerIndex + 2;
  [...Array(numberOfChildren).keys()].forEach(index => {
    childHeaderIndex = fillNode(nodeCollection, file, childHeaderIndex, result, nextNodeName);
  });

  const metadataInfo = { metadataIndex: childHeaderIndex, number: numberOfMetadata };
  return fillMetadata(file, result, metadataInfo, nodeInfo);
};

const part1 = input => {
  const result = { value: 0 };
  const file = input[0].split(' ').map(Number);
  const nodeCollection = {};
  fillNode(nodeCollection, file, 0, result);
  return result;
};
const part2 = () => 0;
module.exports = { fillNode, part1, part2 };
