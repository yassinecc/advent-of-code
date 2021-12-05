require_relative './utils'

class Day1
  def initialize
    @input = Utils.parse_input('day1.txt').map(&:to_i)
  end

  def solve
    [part1(@input), part2(@input)]
  end

  def part1(input)
    common_solver(input, 1)
  end

  def part2(input)
    common_solver(input, 3)
  end

  def common_solver(input, window_size)
    input.each_with_index.reduce(0) do |sum, (_, index)|
      next sum unless (1..input.length - window_size).include?(index)

      sum += 1 if input[index + window_size - 1] > input[index - 1]
      sum
    end
  end
end
