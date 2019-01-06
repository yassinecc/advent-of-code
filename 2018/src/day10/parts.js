const { findRegex } = require('../../utils/common');

const parseMovementData = movementData => {
  const allData = findRegex(movementData, /<(.*?)>/g);
  const [positionData, velocityData] = allData.map(data =>
    data.split(',').map(data => Number(data.split(',')))
  );
  return { positionData, velocityData };
};

const part1 = () => 0;
const part2 = () => 0;
module.exports = { parseMovementData, part1, part2 };
