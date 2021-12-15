require_relative './utils'
require 'matrix'

class Day5
  def initialize
    @input = Utils.parse_input('day5.txt')
  end

  def solve
    [part1(@input), part2(@input)]
  end

  def part1(input)
    max_dimension = get_max_dimension(input)
    grid = Matrix.zero(max_dimension)
    input.map do |line|
      coordinates = line.scan(/[0-9]+/).map(&:to_i)
      next unless coordinates[0] == coordinates[2] || coordinates[1] == coordinates[3]

      x_start, x_end = [coordinates[0], coordinates[2]].sort
      y_start, y_end = [coordinates[1], coordinates[3]].sort

      (x_start..x_end).each do |x|
        (y_start..y_end).each do |y|
          grid[x, y] = grid[x, y] + 1
        end
      end
    end

    result = 0
    grid.each do |element|
      result += 1 if element > 1
    end
    result
  end

  def part2(_input)
    nil
  end

  def get_max_dimension(input)
    input.join(' ').scan(/[0-9]+/).map(&:to_i).max + 1
  end
end
