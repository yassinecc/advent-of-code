require_relative("./parts.rb")

input = File.open(File.expand_path('../../../inputs/day1.txt', __FILE__)).readlines.map(&:chomp)

puts "Total fuel requirements: #{part1(input)}"