const { parseCellLink, createCellNetwork, part1, part2 } = require('../parts');

const instructionsList = [
  'Step C must be finished before step A can begin.',
  'Step C must be finished before step F can begin.',
  'Step A must be finished before step B can begin.',
  'Step A must be finished before step D can begin.',
  'Step B must be finished before step E can begin.',
  'Step D must be finished before step E can begin.',
  'Step F must be finished before step E can begin.',
];

describe('Day 7', () => {
  it('should parse an instruction', () => {
    expect(parseCellLink('Step C must be finished before step A can begin.')).toEqual({
      parent: 'C',
      child: 'A',
    });
  });

  it('should create the cell network', () => {
    const cellCollection = [];
    createCellNetwork(cellCollection, instructionsList);
    const parentNames = cellCollection['E'].parents.map(parent => {
      return parent.name;
    });
    expect(parentNames).toEqual(['B', 'D', 'F']);
  });

  it('should solve part 1', () => {
    expect(part1(instructionsList)).toEqual('CABDFE');
  });
  it('should solve part 2', () => {
    expect(part2(instructionsList, 2, 0)).toEqual({ result: 'CABFDE', totalTime: 15 });
  });
});
