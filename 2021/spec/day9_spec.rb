require 'rspec'
require_relative '../src/day9'

describe 'Day9' do
  let(:input) do
    %w[2199943210
       3987894921
       9856789892
       8767896789
       9899965678]
  end
  context 'part 1' do
    it 'succeeds' do
      day9 = Day9.new
      expect(day9.part1(input)).to eq(15)
    end
  end
  context 'part 2' do
    it 'succeeds' do
    end
  end
end
