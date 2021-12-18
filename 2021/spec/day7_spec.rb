require 'rspec'
require_relative '../src/day7'

describe 'Day7' do
  let(:input) { [16, 1, 2, 0, 4, 2, 7, 1, 2, 14] }
  context 'part 1' do
    it 'succeeds' do
      expect(Day7.new.part1(input)).to eq(37)
    end
  end
  context 'part 2' do
    it 'succeeds' do
      expect(Day7.new.part2(input)).to eq(168)
    end
  end
end
