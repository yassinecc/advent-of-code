def get_single_fuel(mass)
    return (mass.to_i / 3).floor - 2
end

def part1(args)
    return args.map{|x| get_single_fuel(x)}.sum
end