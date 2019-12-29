def part1(args)
    return args.map{|x| (x.to_i / 3).floor - 2 }.sum
end