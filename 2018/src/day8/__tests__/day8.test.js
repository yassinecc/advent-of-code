const { fillNode, getNodeValue, part1, part2 } = require('../parts');

const input = ['2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'];

const file = input[0].split(' ').map(Number);
const nodeCollection = {};
fillNode(nodeCollection, file, 0, 0);

describe('Day 8', () => {
  it('should correctly return for a leaf', () => {
    expect(fillNode({}, file, 2)).toEqual(7);
    expect(fillNode({}, file, 9)).toEqual(12);
  });
  it('should correctly return for a parent with a single leaf', () => {
    expect(fillNode({}, file, 7)).toEqual(13);
  });
  it('should solve part 1', () => {
    expect(part1(file)).toEqual({ value: 138 });
  });
  it('should compute node values', () => {
    const indices = [0, 1, 2, 3];
    const expectedValues = [66, 33, 0, 99];
    const nodeValues = indices.map(index => getNodeValue(nodeCollection, index));
    expect(nodeValues).toEqual(expectedValues);
  });
  it('should solve part 2', () => {
    expect(part2(file)).toEqual(66);
  });
});
