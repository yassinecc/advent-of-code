require 'rspec'
require_relative '../src/day4'
require 'matrix'

describe 'Day4' do
  let(:input) do
    ['7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1',
     '',
     '22 13 17 11 0',
     '8 2 23 4 24',
     '21 9 14 16 7',
     '6 10 3 18 5',
     '1 12 20 15 19',
     '',
     '3 15 0 2 22',
     '9 18 13 17 5',
     '19 8 7 25 23',
     '20 11 10 24 4',
     '14 21 16 12 6',
     '',
     '14 21 17 24 4',
     '10 16 15 9 19',
     '18 8 23 26 20',
     '22 11 13 6 5',
     '2 0 12 3 7']
  end

  it 'makes bingo boards' do
    expect(Day4.new.make_bingo_boards(input) { |value| value })
      .to eq([[7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1],
              [Matrix.rows([%w[22 13 17 11 0],
                            %w[8 2 23 4 24],
                            %w[21 9 14 16 7],
                            %w[6 10 3 18 5],
                            %w[1 12 20 15 19]]),
               Matrix.rows([%w[3 15 0 2 22],
                            %w[9 18 13 17 5],
                            %w[19 8 7 25 23],
                            %w[20 11 10 24 4],
                            %w[14 21 16 12 6]]),
               Matrix.rows([%w[14 21 17 24 4],
                            %w[10 16 15 9 19],
                            %w[18 8 23 26 20],
                            %w[22 11 13 6 5],
                            %w[2 0 12 3 7]])]])
  end

  context 'part 1' do
    it 'succeeds' do
      expect(Day4.new.part1(input)).to eq(4512)
    end
  end

  context 'part 2' do
    it 'succeeds' do
      expect(Day4.new.part2(input)).to eq(1924)
    end
  end
end
