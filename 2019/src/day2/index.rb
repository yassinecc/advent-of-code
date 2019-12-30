require_relative("./parts.rb")
require_relative("../util.rb")

input = parseInput("day2.txt")

replacements = {1 => 12, 2 => 2}
puts "Value at position 0 is #{Day2::part1(input, replacements)[0]}"