const { part1, part2 } = require('../parts');

describe('Day 14', () => {
  it('should solve part 1', () => {
    expect(part1(9)).toEqual('5158916779');
    expect(part1(5)).toEqual('0124515891');
    expect(part1(18)).toEqual('9251071085');
    expect(part1(2018)).toEqual('5941429882');
  });
  it('should solve part 2', () => {
    expect(part2('51589')).toEqual(9);
    expect(part2('01245')).toEqual(5);
    expect(part2('92510')).toEqual(18);
    expect(part2('59414')).toEqual(2018);
  });
});
