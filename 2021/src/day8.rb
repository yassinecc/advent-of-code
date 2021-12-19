require_relative './utils'
require 'set'

class Day8
  def initialize
    @input = Utils.parse_input('day8.txt')
  end

  def solve
    [part1(@input), part2(@input)]
  end

  def part1(input)
    input.reduce(0) do |accumulator, line|
      _, display = line.split(' | ')
      digits = display.split(' ')
      unique_digits = digits.filter do |digit|
        [2, 3, 4, 7].include?(digit.length)
      end
      accumulator + unique_digits.count
    end
  end

  def part2(input)
    input.reduce(0) do |accumulator, line|
      accumulator + decode(line).to_i
    end
  end

  def decode(string)
    instructions, display = string.split(' | ')

    matched_instructions = identify(instructions)

    display.split(' ').map do |instruction|
      sorted_digit_instruction = instruction.split('').sort.join
      matched_instructions.index(sorted_digit_instruction)
    end.join
  end

  # rubocop:disable Metrics/AbcSize
  def identify(instructions)
    instruction_sets = Set.new(instructions.split(' '))

    instruction1 = instruction_sets.find { |set| set.length == 2 }

    instruction4 = instruction_sets.find { |set| set.length == 4 }

    instruction7 = instruction_sets.find { |set| set.length == 3 }

    instruction8 = instruction_sets.find { |set| set.length == 7 }

    instruction2, instruction3, instruction5 = identify_five_long_digits(instruction_sets, instruction1, instruction4)

    instruction0, instruction6, instruction9 = identify_six_long_digits(instruction_sets, instruction1, instruction4)

    [instruction0, instruction1, instruction2, instruction3, instruction4, instruction5, instruction6,
     instruction7, instruction8, instruction9].map do |instruction|
      instruction.split('').sort.join
    end
  end
  # rubocop:enable Metrics/AbcSize

  def identify_five_long_digits(instruction_sets, instruction1, instruction4)
    five_long_instruction_sets = Set.new(instruction_sets.filter { |set| set.length == 5 })
    instruction3 = five_long_instruction_sets.find do |set|
      diff_as_sets(instruction1, set).empty?
    end
    five_long_instruction_sets -= [instruction3] # either 2 or 5 now

    instruction2 = five_long_instruction_sets.find do |set|
      inter_as_sets(instruction4, set).length == 2
    end
    instruction5 = (five_long_instruction_sets - [instruction2]).first
    [instruction2, instruction3, instruction5]
  end

  def identify_six_long_digits(instruction_sets, instruction1, instruction4)
    six_long_instruction_sets = Set.new(instruction_sets.filter { |set| set.length == 6 })

    instruction6 = six_long_instruction_sets.find do |set|
      !diff_as_sets(instruction1, set).empty?
    end
    six_long_instruction_sets -= [instruction6] # either 0 or 9 now

    instruction0 = six_long_instruction_sets.find do |set|
      inter_as_sets(instruction4, set).length == 3
    end
    instruction9 = (six_long_instruction_sets - [instruction0]).first
    [instruction0, instruction6, instruction9]
  end

  def diff_as_sets(ins1, ins2)
    Set.new(ins1.split('')) - Set.new(ins2.split(''))
  end

  def inter_as_sets(ins1, ins2)
    Set.new(ins1.split('')) & Set.new(ins2.split(''))
  end
end
