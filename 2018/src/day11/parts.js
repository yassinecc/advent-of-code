const getEnergyLevel = ({ x, y }, serialNumber) => {
  const rackId = x + 10;
  const int = (y * rackId + serialNumber) * rackId;
  const hundreds = Math.floor(int / 100) % 10;
  return hundreds - 5;
};
const getAreaEnergyLevel = ({ x, y }, serialNumber) => {
  let result = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      result += getEnergyLevel({ x: x + i, y: y + j }, serialNumber);
    }
  }
  return result;
};
const part1 = () => 0;
const part2 = () => 0;
module.exports = { getEnergyLevel, getAreaEnergyLevel, part1, part2 };
