const { zipWith } = require('lodash');
const { findRegex } = require('../../utils/common');

const parseMovementData = movementData => {
  const allData = findRegex(movementData, /<(.*?)>/g);
  const [pos, vel] = allData.map(data => data.split(',').map(data => Number(data.split(','))));
  return { pos, vel };
};

const fillMovementData = inputList => inputList.map(input => parseMovementData(input));

const moveParticle = particleData => ({
  pos: zipWith(particleData.pos, particleData.vel, (pos, vel) => pos + vel),
  vel: particleData.vel,
});

const findDimensions = particleDataArray => {
  const xArray = particleDataArray.map(particleData => particleData.pos[0]);
  const yArray = particleDataArray.map(particleData => particleData.pos[1]);
  return {
    xDiff: Math.max(...xArray) - Math.min(...xArray),
    yDiff: Math.max(...yArray) - Math.min(...yArray),
  };
};

const part1 = () => 0;
const part2 = () => 0;
module.exports = {
  parseMovementData,
  fillMovementData,
  moveParticle,
  findDimensions,
  part1,
  part2,
};
