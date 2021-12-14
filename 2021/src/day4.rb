require_relative './utils'
require 'matrix'
require 'set'

class Day4
  def initialize
    @input = Utils.parse_input('day4.txt')
  end

  def solve
    [part1(@input), part2(@input)]
  end

  def part1(input)
    play(input) do
      true
    end
  end

  def part2(input)
    play(input) do |winners_count, number_of_boards|
      winners_count.length == number_of_boards
    end
  end

  # rubocop:disable Metrics/AbcSize
  # rubocop:disable Metrics/CyclomaticComplexity
  def play(input)
    draws, boards = make_bingo_boards(input, &:to_i)
    winner = nil
    winning_draw = nil
    winning_boards = Set.new
    breaker = false

    draws.each do |draw|
      boards.each_with_index do |board, board_index|
        index = board.index(draw)
        board[*index] = board[*index].to_s if index

        has_board_won = winner?(board)
        winning_boards.add(board_index) if has_board_won
        next unless has_board_won && yield(winning_boards, boards.length)

        winner = board
        winning_draw = draw
        breaker = true
        break
      end
      break if breaker
    end
    unmarked_sum(winner) * winning_draw.to_i
  end
  # rubocop:enable Metrics/CyclomaticComplexity
  # rubocop:enable Metrics/AbcSize

  # rubocop:disable Metrics/AbcSize
  def make_bingo_boards(input, &block)
    end_of_line = 'EOL'
    space = 'SP'
    draws = input.first.split(',').map(&:to_i)
    joined = input[2..].map do |item|
      item == '' ? space : item
    end.join(end_of_line)

    bingo_boards = joined.split(space).map do |bingo_string|
      row_lines = bingo_string.delete_prefix(end_of_line).split(end_of_line).compact
      rows = row_lines.map do |row_line|
        row_line.split(' ').map(&block)
      end
      next Matrix.rows(rows)
    end

    [draws, bingo_boards]
  end
  # rubocop:enable Metrics/AbcSize

  def winner?(board)
    board.row_vectors.each do |row|
      return true if row.all? { |el| el.to_s == el }
    end

    board.column_vectors.each do |column|
      return true if column.all? { |el| el.to_s == el }
    end

    false
  end

  def unmarked_sum(board)
    sum = 0
    board.each do |element|
      sum += element if element.to_i == element
    end
    sum
  end
end
