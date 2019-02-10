const { getInitialState, getSpreadRules, padInput, part1, part2 } = require('../parts');

describe('Day 12', () => {
  it('should get the initial state', () => {
    const input = 'initial input: #..#..##.###.#..#.#';
    expect(getInitialState(input)).toEqual('1001001101110100101');
  });
  it('should get spread rules', () => {
    const input = `
    initial input: ##.##..#..#.#.

    ....# => #
    ...#. => #
    ..... => .
    ...## => .

    `;
    expect(getSpreadRules(input)).toEqual(['0', '1', '1', '0']);
  });
  it('should pad input', () => {
    expect(padInput('01100111000')).toEqual('00000110011100000');
  });
  it('should solve part 1', () => {
    expect(part1()).toEqual(0);
  });
  it('should solve part 2', () => {
    expect(part2()).toEqual(0);
  });
});
