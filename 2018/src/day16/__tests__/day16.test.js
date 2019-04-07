const { parseRegisters, parseInstruction, executeSample, part1, part2 } = require('../parts');

const testInput = ['Before: [3, 2, 1, 1]', '9 2 1 2', 'After:  [3, 2, 2, 1]'];

describe('Day 16', () => {
  it('should parse register strings', () => {
    expect(parseRegisters('[3, 0, 1, 3]')).toEqual([3, 0, 1, 3]);
  });
  it('should parse instructions', () => {
    expect(parseInstruction('13 2 3 3')).toEqual({ opId: 13, inA: 2, inB: 3, regC: 3 });
  });
  it('should execute opcodes over a sample', () => {
    expect(executeSample(testInput).length).toEqual(3);
  });
  it('should solve part 1', () => {
    expect(part1(testInput)).toEqual(1);
  });
  it('should solve part 2', () => {
    expect(part2()).toEqual(0);
  });
});
