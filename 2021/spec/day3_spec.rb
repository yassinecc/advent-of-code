require 'rspec'
require_relative '../src/day3'

describe 'Day3' do
  let(:input) do
    %w[00100
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
       01010]
  end
  context 'part 1' do
    it 'succeeds' do
      expect(Day3.new.part1(input)).to eq(198)
    end
  end

  context 'part 2' do
    it 'succeeds' do
      expect(Day3.new.part2(input)).to eq(230)
    end
  end
end
