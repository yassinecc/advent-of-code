const { zeros } = require('vectorious');
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
  vel: particleData.vel
});

const findDimensions = particleDataArray => {
  const xArray = particleDataArray.map(particleData => particleData.pos[0]);
  const yArray = particleDataArray.map(particleData => particleData.pos[1]);
  return {
    xMin: Math.min(...xArray),
    yMin: Math.min(...yArray),
    xDiff: Math.max(...xArray) - Math.min(...xArray),
    yDiff: Math.max(...yArray) - Math.min(...yArray)
  };
};

const printData = particleDataArray => {
  const { xMin, yMin, xDiff, yDiff } = findDimensions(particleDataArray);
  const offsetParticles = particleDataArray.map(particle => ({
    pos: [particle.pos[0] - xMin, particle.pos[1] - yMin],
    vel: particle.vel
  }));
  const visualArray = zeros(xDiff + 1, yDiff + 1);
  offsetParticles.forEach(particle => {
    const { pos } = particle;
    visualArray.set(pos[0], pos[1], 1);
  });
  let line = '';
  for (let j = 0; j < yDiff + 1; j++) {
    for (let i = 0; i < xDiff + 1; i++) {
      line = line.concat(visualArray.get(i, j) === 0 ? '.' : '#');
    }
    line = line.concat('\n');
  }
  return line;
};

let time = 0;
const part1 = input => {
  let movementData = fillMovementData(input);
  let xDifference = undefined;
  let yDifference = undefined;
  let newData;
  while (true) {
    newData = movementData.map(moveParticle);
    const { xDiff, yDiff } = findDimensions(newData);
    if (xDiff > xDifference && yDiff > yDifference) {
      return printData(movementData);
    } else {
      time++;
      xDifference = xDiff;
      yDifference = yDiff;
      movementData = newData;
    }
  }
};
const part2 = () => time;
module.exports = {
  parseMovementData,
  fillMovementData,
  moveParticle,
  findDimensions,
  part1,
  part2
};
