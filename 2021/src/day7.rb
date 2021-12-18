require_relative './utils'

class Day7
  def initialize
    @input = Utils.parse_input('day7.txt').first.split(',').map(&:to_i)
  end

  def solve
    [part1(@input), part2(@input)]
  end

  def part1(input)
    median = median(input)
    input.reduce(0) do |accumulator, element|
      accumulator + (element - median).abs
    end
  end

  def part2(input)
    # p input
  end

  def median(array)
    sorted = array.sort
    middle = (sorted.length - 1) / 2.0
    (sorted[middle.floor] + sorted[middle.ceil]) / 2
  end
end
