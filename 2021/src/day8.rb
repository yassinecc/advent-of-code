require_relative './utils'
require 'set'

#  aaaa
# b    c
# b    c
#  dddd
# e    f
# e    f
#  gggg
#
#
# 1 -> 2 switches c, f
# 7 -> 3 switches a, c, f
# 4 -> 4 switches b, c, d, f
# 8 -> 7 switches a, b, c, d, e, f, g
# 2, 3, 5 -> 5 switches sharing a,d,g and diffing in ce/cf/bf
# 0, 6, 9 -> 6 switches sharing a,b,f,g and diffing in ce/de/cd

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

  def identify(instructions)
    instruction_sets = Set.new(instructions.split(' '))

    five_long_instruction_sets = Set.new(instruction_sets.filter { |set| set.length == 5 })
    six_long_instruction_sets = Set.new(instruction_sets.filter { |set| set.length == 6 })

    instruction1 = instruction_sets.find { |set| set.length == 2 }
    raise if instruction1.nil?

    instruction4 = instruction_sets.find { |set| set.length == 4 }
    raise if instruction4.nil?

    instruction7 = instruction_sets.find { |set| set.length == 3 }
    raise if instruction7.nil?

    instruction8 = instruction_sets.find { |set| set.length == 7 }
    raise if instruction8.nil?

    instruction3 = five_long_instruction_sets.find do |set|
      (Set.new(instruction1.split('')) - Set.new(set.split(''))).empty?
    end
    five_long_instruction_sets -= [instruction3] # either 2 or 5 now

    instruction2 = five_long_instruction_sets.find do |set|
      (Set.new(instruction4.split('')) & Set.new(set.split(''))).length == 2
    end
    instruction5 = (five_long_instruction_sets - [instruction2]).first

    instruction6 = six_long_instruction_sets.find do |set|
      !(Set.new(instruction1.split('')) - Set.new(set.split(''))).empty?
    end
    six_long_instruction_sets -= [instruction6] # either 0 or 9 now

    instruction0 = six_long_instruction_sets.find do |set|
      (Set.new(instruction4.split('')) & Set.new(set.split(''))).length == 3
    end
    instruction9 = (six_long_instruction_sets - [instruction0]).first

    [instruction0, instruction1, instruction2, instruction3, instruction4, instruction5, instruction6,
     instruction7, instruction8, instruction9].map do |instruction|
      instruction.split('').sort.join
    end
  end
end
