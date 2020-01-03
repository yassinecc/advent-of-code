# frozen_string_literal: true

# Day 2 module
module DayTwo
  class << self
    def get_new_value(program, index, op_code)
      first_value = program[program[index + 1]]
      second_value = program[program[index + 2]]
      if op_code.equal? 1
        new_value = first_value + second_value
      elsif op_code.equal? 2
        new_value = first_value * second_value
      else
        raise "Unknown opCode #{op_code} for program #{program}"
      end
      new_value
    end

    def process_op_code(program, index, op_code)
      # opCode should be followed by 3 positions and the next opCode
      raise 'Opcode too close to end of program' if index >= program.length - 4

      new_value = get_new_value(program, index, op_code)
      target_index = program[index + 3]
      new_program = program.clone
      new_program[target_index] = new_value
      { program: new_program, index: index + 4 }
    end

    def process_program(args)
      index = args[:index]
      program = args[:program]
      program_length = program.length
      raise 'Index out of bounds' if index.negative? || index >= program_length

      op_code = program[index]
      if op_code.equal? 99
        { program: program, index: -1 }
      else
        process_op_code(program, index, op_code)
      end
    end

    def part_one(args, replacements = {})
      program = args[0].split(',').map(&:to_i)
      replacements.keys.each { |key| program[key] = replacements[key] }
      index = 0
      while index >= 0
        processed_program = process_program(program: program, index: index)
        program = processed_program[:program]
        index = processed_program[:index]
      end
      program
    end

    def advance(noun_index, verb_index)
      if noun_index < 99
        new_noun_index = noun_index + 1
        new_verb_index = verb_index
      else
        new_noun_index = 0
        new_verb_index = verb_index + 1
      end
      { noun_index: new_noun_index, verb_index: new_verb_index }
    end

    def part_two(args, target)
      noun_index = 0
      verb_index = 0
      loop do
        new_program = part_one(args, 1 => noun_index, 2 => verb_index)
        return 100 * noun_index + verb_index if new_program[0].equal? target

        indices = advance(noun_index, verb_index)
        noun_index = indices[:noun_index]
        verb_index = indices[:verb_index]
      end
    end
  end
end
