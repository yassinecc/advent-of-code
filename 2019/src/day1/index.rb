require_relative("./parts.rb")

input = File.open(File.expand_path('../../../inputs/day1.txt', __FILE__)).readlines.map(&:chomp)

puts "Total fuel requirements: #{part1(input)}"
puts "Total fuel requirements for part 2: #{part2(input)}"