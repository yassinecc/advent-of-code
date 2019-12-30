def get_single_fuel(mass)
    return (mass.to_i / 3).floor - 2
end

def get_composite_fuel(fuel)
    result = 0
    extra = fuel
    while(get_single_fuel(extra) > 0)
        extraFuel = get_single_fuel(extra)
        result += extraFuel
        extra = extraFuel
    end
    return result
end

module Day1
    class << self
        def part1(args)
            return args.map{|x| get_single_fuel(x)}.sum
        end

        def part2(args)
            return args.map{|x| get_composite_fuel(x)}.sum
        end
    end
end