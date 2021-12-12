require 'rspec'
require_relative '../src/day2'

describe 'Day2' do
  let(:input) do
    ['forward 5',
     'down 5',
     'forward 8',
     'up 3',
     'down 8',
     'forward 2']
  end
  context 'part 1' do
    it 'succeeds' do
      expect(Day2.new.part1(input)).to eq(150)
    end
  end
  context 'part 2' do
    it 'succeeds' do
      expect(Day2.new.part2(input)).to eq(900)
    end
  end
end
