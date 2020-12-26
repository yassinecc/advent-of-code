#! /usr/bin/python3

import utils
import day1

file_input = utils.read_file("./inputs/day1.txt")
input = [int(line) for line in file_input]
print(day1.part1(input, 2020))
print(day1.part2(input, 2020))
