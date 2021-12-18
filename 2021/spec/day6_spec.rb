require 'rspec'
require_relative '../src/day6'

describe 'Day6' do
  let(:input) { [3, 4, 3, 1, 2] }
  context 'part 1' do
    it 'succeeds' do
      expect(Day6.new.part1(input, 18)).to eq(26)
      expect(Day6.new.part1(input, 80)).to eq(5934)
    end
  end
  context 'part 2' do
    it 'succeeds' do
    end
  end
end
