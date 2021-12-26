require_relative './utils'
require('matrix')
require('set')

class Day9
  TOP_HEIGHT = 9
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
    areas = []
    heightmap = Matrix.rows(input.map { |line| line.split('').map(&:to_i) })
    heightmap.each_with_index do |_, row, col|
      next unless local_minimum(heightmap, row, col)

      areas << area_size(heightmap, row, col)
    end
    areas.sort.reverse.take(3).reduce(1, :*)
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

  def area_size(heightmap, row, col)
    visited = Set.new
    to_visit = Set.new([[row, col]])

    until to_visit.empty?
      next_to_visit = Set.new
      to_visit.each do |point|
        neighbors = non_peak_neighbors(heightmap, point[0], point[1])
        unseen_neighbors = neighbors - (to_visit | visited)

        next_to_visit.merge(unseen_neighbors)
        to_visit.delete(point)
        visited.add(point)
      end
      to_visit.merge(next_to_visit)
    end
    visited.size
  end

  def non_peak_neighbors(heightmap, row, col)
    result = Set.new
    [-1, 1].each do |row_idx|
      [-1, 1].each do |col_idx|
        # Apply a rotation matrix
        row_inc = (row_idx + col_idx) / 2
        col_inc = (row_idx - col_idx) / 2
        next if safe_matrix_get(heightmap, row + row_inc, col + col_inc) >= TOP_HEIGHT

        result << [row + row_inc, col + col_inc]
      end
    end
    result
  end

  def safe_matrix_get(matrix, row, col)
    return TOP_HEIGHT + 1 unless row.between?(0, matrix.row_count - 1) && col.between?(0, matrix.column_count - 1)

    matrix[row, col]
  end
end
