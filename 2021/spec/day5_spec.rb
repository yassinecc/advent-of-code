require 'rspec'
require_relative '../src/day5'

describe 'Day5' do
  let(:input) do
    ['0,9 -> 5,9',
     '8,0 -> 0,8',
     '9,4 -> 3,4',
     '2,2 -> 2,1',
     '7,0 -> 7,4',
     '6,4 -> 2,0',
     '0,9 -> 2,9',
     '3,4 -> 1,4',
     '0,0 -> 8,8',
     '5,5 -> 8,2']
  end

  it 'gets the maximum dimension for solution space' do
    expect(Day5.new.get_max_dimension(input)).to eq(10)
  end

  context 'part 1' do
    it 'succeeds' do
      expect(Day5.new.part1(input)).to eq(5)
    end
  end

  context 'part 2' do
    it 'succeeds' do
      expect(Day5.new.part2(input)).to eq(12)
    end
  end
end
