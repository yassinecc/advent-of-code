const fillNode = (file, headerIndex, result = { value: 0 }) => {
  const numberOfChildren = file[headerIndex];
  const metadataIndex = headerIndex + 1;
  const numberOfMetadata = file[headerIndex + 1];
  if (numberOfChildren === 0) {
    [...Array(numberOfMetadata).keys()].forEach(index => {
      result.value = result.value + file[metadataIndex + 1 + index];
    });
    return metadataIndex + numberOfMetadata + 1;
  }
  let childHeaderIndex = headerIndex + 2;
  [...Array(numberOfChildren).keys()].forEach(index => {
    childHeaderIndex = fillNode(file, childHeaderIndex, result);
  });

  [...Array(numberOfMetadata).keys()].forEach(index => {
    result.value = result.value + file[childHeaderIndex + index];
  });
  return childHeaderIndex + numberOfMetadata;
};

const part1 = input => {
  const result = { value: 0 };
  const file = input[0].split(' ').map(Number);
  fillNode(file, 0, result);
  return result;
};
const part2 = () => 0;
module.exports = { fillNode, part1, part2 };
