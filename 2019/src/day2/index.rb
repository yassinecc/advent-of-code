require_relative("./parts.rb")
require_relative("../util.rb")

input = parseInput("day2.txt")

replacements = { 1 => 12, 2 => 2 }
puts "Value at position 0 is #{Day2::part1(input, replacements)[0]}"

puts "Target input is #{Day2::part2(input, 19690720)}"