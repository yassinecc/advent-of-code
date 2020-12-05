# frozen_string_literal: true

# Day 1 module
module DayOne
  module_function

  def get_single_fuel(mass)
    (mass.to_i / 3).floor - 2
  end

  def get_composite_fuel(fuel)
    result = 0
    extra = fuel
    loop do
      extra_fuel = get_single_fuel(extra)
      break unless extra_fuel.positive?

      result += extra_fuel
      extra = extra_fuel
    end
    result
  end

  def part_one(args)
    args.map { |mass| get_single_fuel(mass) }.sum
  end

  def part_two(args)
    args.map { |mass| get_composite_fuel(mass) }.sum
  end
end
