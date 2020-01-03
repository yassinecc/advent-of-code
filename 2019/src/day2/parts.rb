# frozen_string_literal: true

# Day 2 module
module DayTwo
  class << self
    def process_op_code(program, index, op_code)
      first_value = program[program[index + 1]]
      second_value = program[program[index + 2]]
      if op_code.equal? 1
        new_value = first_value + second_value
      elsif op_code.equal? 2
        new_value = first_value * second_value
      else
        raise "Unknown opCode #{op_code} for program #{program}"
      end
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
      # opCode should be followed by 3 positions and the next opCode
      elsif index >= program_length - 4
        raise 'Opcode too close to end of program'
      else
        process_op_code(program, index, op_code)
      end
    end

    def part_one(args, replacements = nil)
      program = args[0].split(',').map(&:to_i)
      replacements&.keys&.each { |key| program[key] = replacements[key] }
      index = 0
      while index >= 0
        processed_program = process_program(program: program, index: index)
        program = processed_program[:program]
        index = processed_program[:index]
      end
      program
    end

    def part_two(args, target)
      noun = nil
      verb = nil
      should_continue = true
      noun_index = 0
      verb_index = 0
      while should_continue
        new_program = part_one(args, 1 => noun_index, 2 => verb_index)
        if new_program[0].equal? target
          noun = noun_index
          verb = noun_index
          should_continue = false
        end
        if noun_index < 99
          noun_index += 1
        else
          noun_index = 0
          verb_index += 1
        end
      end
      100 * noun + verb
    end
  end
end
