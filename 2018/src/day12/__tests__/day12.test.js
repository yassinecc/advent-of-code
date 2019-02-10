const {
  convertInput,
  getInitialState,
  getSpreadRules,
  spreadPlants,
  padInput,
  countPotsNumber,
} = require('../parts');

const plantString = '...#..#.#..##......###...###...........';

const spreadRulesString = `
...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #
`;

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
    expect(padInput({ input: '01100111000', minIndex: 0 })).toEqual({
      paddedInput: '00000110011100000',
      minIndex: -4,
    });
  });
  it('should spread plants to the next generation', () => {
    const spreadRules = getSpreadRules(spreadRulesString);
    expect(
        spreadPlants({ input: convertInput(plantString), minIndex: 0 }, spreadRules).input
    ).toEqual(convertInput('.....#...#....#.....#..#..#..#....'));
  });
  it('should count pots numbers', () => {
    expect(
        countPotsNumber({
          input: convertInput('.#....##....#####...#######....#.#..##.'),
          minIndex: -3,
        })
    ).toEqual(325);
  });
});
