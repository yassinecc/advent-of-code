# frozen_string_literal: true

require_relative('../day1/parts')

RSpec.describe 'Day 1' do
  it 'solves part 1' do
    expect(DayOne.part_one([12])).to eq 2
    expect(DayOne.part_one([14])).to eq 2
    expect(DayOne.part_one([1969])).to eq 654
    expect(DayOne.part_one([100_756])).to eq 33_583
  end

  it 'solves part 2' do
    expect(DayOne.part_two([14])).to eq 2
    expect(DayOne.part_two([1969])).to eq 966
    expect(DayOne.part_two([100_756])).to eq 50_346
  end
end
