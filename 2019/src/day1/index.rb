require_relative("./parts.rb")
require_relative("../util.rb")

input = parseInput("day1.txt")

puts "Total fuel requirements: #{part1(input)}"
puts "Total fuel requirements for part 2: #{part2(input)}"