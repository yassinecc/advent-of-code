require_relative './utils'
require 'matrix'

class Day3
  def initialize
    @input = Utils.parse_input('day3.txt')
  end

  def solve
    [part1(@input), part2(@input)]
  end

  def part1(input)
    array = counter_array(input)
    most_commons = array.map do |element|
      element / (input.length / 2)
    end.join('').to_i(2)

    mask = array.clone.fill(1).join('').to_i(2)
    least_commons = most_commons ^ mask

    most_commons * least_commons
  end

  def part2(input)
    oxygen_rating = get_rating(input) do |element, length|
      element >= length ? 1 : 0
    end

    co2_rating = get_rating(input) do |element, length|
      element >= length ? 0 : 1
    end

    oxygen_rating * co2_rating
  end

  def counter_array(input)
    array = Array.new(input.first.length).fill(0)
    input.each do |element|
      element.split('').each_with_index do |bit, index|
        array[index] += bit.to_i
      end
    end
    array
  end

  # rubocop:disable Metrics/AbcSize
  # rubocop:disable Metrics/MethodLength
  def get_rating(input)
    index = 0
    while input.length > 1
      counter = counter_array(input)
      most_commons = counter.map do |element|
        yield(element, input.length.fdiv(2).ceil)
      end
      new_input = input.filter do |element|
        (element[index].to_i ^ most_commons[index].to_i).zero?
      end
      index = (index + 1) % input.first.length
      input = new_input
    end
    input.first.to_i(2)
  end
  # rubocop:enable Metrics/AbcSize
  # rubocop:enable Metrics/MethodLength
end
