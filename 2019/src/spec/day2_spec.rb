# frozen_string_literal: true

require_relative '../day2/parts'

RSpec.describe 'Day2' do
  it 'computes the next program' do
    arg0 = { program: [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50], index: 0 }
    arg1 = { program: [1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50], index: 4 }
    arg2 = { program: [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50], index: 8 }
    arg3 = {
      program: [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50], index: -1
    }
    expect(DayTwo.process_program(arg0)).to eq arg1
    expect(DayTwo.process_program(arg1)).to eq arg2
    expect(DayTwo.process_program(arg2)).to eq arg3
  end

  it 'solves part 1' do
    start1 = ['1,0,0,0,99']
    finish1 = [2, 0, 0, 0, 99]
    expect(DayTwo.part_one(start1)).to eq finish1

    start2 = ['2,3,0,3,99']
    finish2 = [2, 3, 0, 6, 99]
    expect(DayTwo.part_one(start2)).to eq finish2

    start3 = ['2,4,4,5,99,0']
    finish3 = [2, 4, 4, 5, 99, 9801]
    expect(DayTwo.part_one(start3)).to eq finish3

    start4 = ['1,1,1,4,99,5,6,0,99']
    finish4 = [30, 1, 1, 4, 2, 5, 6, 0, 99]
    expect(DayTwo.part_one(start4)).to eq finish4
  end
end
