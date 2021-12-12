require 'rspec'
require_relative '../src/day1'

describe 'Day1' do
  let(:input) { [199, 200, 208, 210, 200, 207, 240, 269, 260, 263] }
  context 'part 1' do
    it 'succeeds' do
      expect(Day1.new.part1([199, 200])).to eq(1)
      expect(Day1.new.part1(input)).to eq(7)
    end
  end
  context 'part 2' do
    it 'succeeds' do
      expect(Day1.new.part2(input)).to eq(5)
    end
  end
end
