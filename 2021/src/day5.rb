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
    count_overlap(input, true)
  end

  def part2(input)
    count_overlap(input, false)
  end

  def count_overlap(input, skip_diagonals)
    max_dimension = get_max_dimension(input)
    grid = Matrix.zero(max_dimension)
    input.map do |line|
      coordinates = line.scan(/[0-9]+/).map(&:to_i)
      next unless !skip_diagonals || (coordinates[0] == coordinates[2] || coordinates[1] == coordinates[3])

      points_in_path(coordinates).each do |point|
        grid[*point] = grid[*point] + 1
      end
    end

    result = 0
    grid.each do |element|
      result += 1 if element > 1
    end
    result
  end

  def get_max_dimension(input)
    input.join(' ').scan(/[0-9]+/).map(&:to_i).max + 1
  end

  def points_in_path(coordinates)
    x_step = coordinates[2] <=> coordinates[0]
    y_step = coordinates[3] <=> coordinates[1]

    length = [(coordinates[0] - coordinates[2]).abs, (coordinates[1] - coordinates[3]).abs].max
    (0..length).map do |step|
      [coordinates[0] + step * x_step, coordinates[1] + step * y_step]
    end
  end
end
