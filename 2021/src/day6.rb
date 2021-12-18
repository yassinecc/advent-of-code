require_relative './utils'

class Day6
  def initialize
    @input = Utils.parse_input('day6.txt').first.split(',').map(&:to_i)
  end

  def solve
    [part1(@input, 80), part2(@input)]
  end

  def part1(input, duration)
    fishes = input.clone
    (1..duration).each do
      new_fishes = []
      fishes.each_with_index do |fish, index|
        if fish.zero?
          fishes[index] = 6
          new_fishes << 8
        else
          fishes[index] = fish - 1
        end
      end
      fishes.concat(new_fishes)
    end
    fishes.count
  end

  def part2(input)
    # p input
  end
end
