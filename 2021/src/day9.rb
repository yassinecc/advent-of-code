require_relative './utils'
require('matrix')

class Day9
  def initialize
    @input = Utils.parse_input('day9.txt')
  end

  def solve
    [part1(@input), part2(@input)]
  end

  def part1(input)
    score = 0
    heightmap = Matrix.rows(input.map { |line| line.split('').map(&:to_i) })
    heightmap.each_with_index do |_, row, col|
      next unless local_minimum(heightmap, row, col)

      score += 1 + heightmap[row, col]
    end
    score
  end

  def part2(input)
    # p input
  end

  def local_minimum(heightmap, row, col)
    height = heightmap[row, col]

    upper_neighbor = safe_matrix_get(heightmap, row - 1, col)
    return false unless height < upper_neighbor

    lower_neighbor = safe_matrix_get(heightmap, row + 1, col)
    return false unless height < lower_neighbor

    left_neighbor = safe_matrix_get(heightmap, row, col - 1)
    return false unless height < left_neighbor

    right_neighbor = safe_matrix_get(heightmap, row, col + 1)
    return false unless height <= right_neighbor

    true
  end

  def safe_matrix_get(matrix, row, col)
    return 10 unless row.between?(0, matrix.row_count - 1) && col.between?(0, matrix.column_count - 1)

    matrix[row, col]
  end
end
