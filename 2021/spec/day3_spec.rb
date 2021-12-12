require 'rspec'
require_relative '../src/day3'

describe 'Day3' do
  context 'part 1' do
    it 'succeeds' do
      expect(Day3.new.part1(%w[00100
                               11110
                               10110
                               10111
                               10101
                               01111
                               00111
                               11100
                               10000
                               11001
                               00010
                               01010])).to eq(198)
    end
  end
end
