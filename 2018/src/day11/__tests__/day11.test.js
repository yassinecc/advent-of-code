const Matrix = require('vectorious').Matrix;
const {
  getEnergyLevel,
  getAreaEnergyLevel,
  getEnergyTable,
  getSummedTable,
  part1,
  part2,
} = require('../parts');

getEdge = (point, cellSize) => ({ z: point.x + cellSize - 1, t: point.y + cellSize - 1 });

describe('Day 11', () => {
  it.each([
    [{ x: 3, y: 5 }, 8, 4],
    [{ x: 122, y: 79 }, 57, -5],
    [{ x: 217, y: 196 }, 39, 0],
    [{ x: 101, y: 153 }, 71, 4],
  ])('should find the correct energy', (cell, serialNumber, result) => {
    const point = { x: cell.x - 1, y: cell.y - 1 };
    return expect(getEnergyLevel(point, serialNumber)).toEqual(result);
  });

  it('should compute a summed table', () => {
    const energyTable = new Matrix([[2, -3], [5, 7]]);
    expect(getSummedTable(energyTable)).toEqual(new Matrix([[2, -1], [7, 11]]));
  });

  it.each([[{ x: 33, y: 45 }, 18, 29], [{ x: 21, y: 61 }, 42, 30]])(
      'should find the correct area energy',
      (cell, serialNumber, result) => {
        const energyTable = getEnergyTable(serialNumber);
        const summedTable = getSummedTable(energyTable);
        const cellSize = 3;
        const point = { x: cell.x - 1, y: cell.y - 1 };
        const edge = getEdge(point, cellSize);

        expect(getAreaEnergyLevel(summedTable, point, edge)).toEqual(result);
      }
  );

  it.each([[{ x: 90, y: 269 }, 18, 16, 113], [{ x: 232, y: 251 }, 42, 12, 119]])(
      'should find the correct max area energy',
      (cell, serialNumber, size, result) => {
        const point = { x: cell.x - 1, y: cell.y - 1 };
        const edge = getEdge(point, size);
        const energyTable = getEnergyTable(serialNumber);
        const summedTable = getSummedTable(energyTable);

        expect(getAreaEnergyLevel(summedTable, point, edge)).toEqual(result);
      }
  );

  it('should solve part 1', () => {
    expect(part1(18)).toEqual({ x: 33, y: 45 });
    expect(part1(42)).toEqual({ x: 21, y: 61 });
  });
  it('should solve part 2', () => {
    expect(part2(18)).toEqual({ x: 90, y: 269, size: 16 });
    expect(part2(42)).toEqual({ x: 232, y: 251, size: 12 });
  });
});
