# frozen_string_literal: true

require_relative('./parts')
require_relative('../util')

input = Utils.parse_input('day2.txt')

replacements = { 1 => 12, 2 => 2 }
puts "Value at position 0 is #{DayTwo.part_one(input, replacements)[0]}"

puts "Target input is #{DayTwo.part_two(input, 19_690_720)}"
