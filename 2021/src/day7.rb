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
    sorted = input.sort
    cost = fuel_to_destination(sorted.first, sorted.last) * sorted.length
    (sorted.min..sorted.max).each do |position|
      new_cost = sorted.reduce(0) do |accumulator, element|
        accumulator + fuel_to_destination(element, position)
      end
      break if new_cost > cost # assuming the total cost function is parabolic

      cost = new_cost
    end
    cost
  end

  def median(array)
    sorted = array.sort
    middle = (sorted.length - 1) / 2.0
    (sorted[middle.floor] + sorted[middle.ceil]) / 2
  end

  def fuel_to_destination(start, finish)
    distance = (finish - start).abs
    (distance * (distance + 1)) / 2
  end
end
