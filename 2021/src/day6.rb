require_relative './utils'

class Day6
  def initialize
    @input = Utils.parse_input('day6.txt').first.split(',').map(&:to_i)
  end

  def solve
    [part1(@input, 80), part2(@input, 256)]
  end

  def part1(input, duration)
    fishes = input.tally
    (1..duration).each do
      fishes = next_fishes_array(fishes).each_with_object({}) do |pair, accumulator|
        key, value = pair
        accumulator[key] = (accumulator[key] || 0) + value
      end
    end
    fishes.values.sum
  end

  def part2(input, duration)
    part1(input, duration)
  end

  def next_fishes_array(fishes)
    new_fishes = fishes[0] || 0
    next_fishes_array = fishes.map do |clock, number|
      clock.zero? ? [6, number] : [clock - 1, number]
    end
    next_fishes_array.append([8, new_fishes]) unless new_fishes.zero?
    next_fishes_array
  end
end
