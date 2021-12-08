require_relative './utils'
require 'matrix'

class Day2
  def initialize
    @input = Utils.parse_input('day2.txt')
  end

  def solve
    [part1(@input), part2(@input)]
  end

  def part1(input)
    final_vector = input.reduce(Vector[0, 0, 0]) do |vector, instruction|
      direction, magnitude = parse_instruction(instruction)
      vector + propel(direction: direction, magnitude: magnitude, aim: 0)
    end
    final_vector.element(0) * final_vector.element(2)
  end

  def part2(input)
    final_vector = input.reduce(Vector[0, 0, 0]) do |vector, instruction|
      direction, magnitude = parse_instruction(instruction)
      vector + propel(direction: direction,
                      magnitude: magnitude,
                      aim: vector.element(2))
    end

    final_vector.element(0) * final_vector.element(1)
  end

  def parse_instruction(instruction)
    instruction_parts = instruction.split(' ')

    direction = instruction_parts.first
    magnitude = instruction_parts.last.to_i

    [direction, magnitude]
  end

  def propel(direction:, magnitude:, aim:)
    unit_vector_3d(direction, aim) * magnitude
  end

  def unit_vector_3d(direction, aim)
    case direction
    when 'forward' then Vector[1, aim, 0]
    when 'down' then Vector[0, 0, 1]
    when 'up' then Vector[0, 0, -1]
    else Vector[0, 0, 0]
    end
  end
end
