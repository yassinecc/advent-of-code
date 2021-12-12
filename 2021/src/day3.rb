require_relative './utils'
require 'matrix'

class Day3
  def initialize
    @input = Utils.parse_input('day3.txt')
  end

  def solve
    [part1(@input), part2(@input)]
  end

  def part1(input)
    array = counter_array(input)
    most_commons = array.map do |element|
      element / (input.length / 2)
    end.join('').to_i(2)

    mask = array.clone.fill(1).join('').to_i(2)
    least_commons = most_commons ^ mask

    most_commons * least_commons
  end

  def part2(_input)
    nil
  end

  def counter_array(input)
    array = Array.new(input.first.length).fill(0)
    input.each do |element|
      element.split('').each_with_index do |bit, index|
        array[index] += bit.to_i
      end
    end
    array
  end
end
