module Day2
    class << self

        def processProgram(args)
            index = args[:index]
            program = args[:program]
            if index < 0 || index >= program.length
                raise "Index out of bounds"
            end
            opCode = program[index]
            if opCode === 99
                return { program: program, index: -1 }
            elsif opCode === 1
                # opCode should be followed by 3 positions and the next opCode
                if index >= program.length - 4
                    raise "Opcode too close to end of program"
                else
                    firstValue = program[program[index + 1]]
                    secondValue = program[program[index + 2]]
                    targetIndex = program[index + 3]
                    newProgram = program.clone
                    newProgram[targetIndex] = firstValue + secondValue
                    return { program: newProgram, index: index + 4 }
                end
            elsif opCode === 2
                # opCode should be followed by 3 positions and the next opCode
                if index >= program.length - 4
                    raise "Opcode too close to end of program"
                else
                    firstValue = program[program[index + 1]]
                    secondValue = program[program[index + 2]]
                    targetIndex = program[index + 3]
                    newProgram = program.clone
                    newProgram[targetIndex] = firstValue * secondValue
                    return { program: newProgram, index: index + 4 }
                end
            else
                raise "Unknown opCode #{opCode} found at index #{index} for program #{program}"
            end
        end

        def part1(args, replacements = nil)
            program = args[0].split(",").map(&:to_i)
            unless replacements.nil?
                replacements.keys.each { |key| program[key] = replacements[key]}
            end
            index = 0
            while index >= 0
                processedProgram = processProgram({ program: program, index: index })
                program = processedProgram[:program]
                index = processedProgram[:index]
            end
            return program
        end
    end
end