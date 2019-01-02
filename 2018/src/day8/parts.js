const fillMetadata = (file, result, metadataIndex, numberOfMetadata) => {
  [...Array(numberOfMetadata).keys()].forEach(index => {
    result.value = result.value + file[metadataIndex + index];
  });
  return metadataIndex + numberOfMetadata;
};

const fillNode = (file, headerIndex, result = { value: 0 }) => {
  const numberOfChildren = file[headerIndex];
  const metadataIndex = headerIndex + 1;
  const numberOfMetadata = file[headerIndex + 1];
  if (numberOfChildren === 0) {
    return fillMetadata(file, result, metadataIndex + 1, numberOfMetadata);
  }
  let childHeaderIndex = headerIndex + 2;
  [...Array(numberOfChildren).keys()].forEach(index => {
    childHeaderIndex = fillNode(file, childHeaderIndex, result);
  });

  return fillMetadata(file, result, childHeaderIndex, numberOfMetadata);
};

const part1 = input => {
  const result = { value: 0 };
  const file = input[0].split(' ').map(Number);
  fillNode(file, 0, result);
  return result;
};
const part2 = () => 0;
module.exports = { fillNode, part1, part2 };
