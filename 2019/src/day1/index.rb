# frozen_string_literal: true

require_relative('./parts')
require_relative('../util')

input = Utils.parse_input('day1.txt')

puts "Total fuel requirements: #{DayOne.part_one(input)}"
puts "Total fuel requirements for part 2: #{DayOne.part_two(input)}"
