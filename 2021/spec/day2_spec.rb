require 'rspec'
require_relative '../src/day2'

describe 'Day2' do
  context 'part 1' do
    it 'succeeds' do
      expect(Day2.new.part1(['forward 5',
                             'down 5',
                             'forward 8',
                             'up 3',
                             'down 8',
                             'forward 2'])).to eq(150)
    end
  end
  context 'part 2' do
    it 'succeeds' do
      expect(Day2.new.part2(['forward 5',
                             'down 5',
                             'forward 8',
                             'up 3',
                             'down 8',
                             'forward 2'])).to eq(900)
    end
  end
end
