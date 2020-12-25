#! /usr/bin/python3

import utils
import day1

input = list(map(lambda str: int(str), utils.read_file("./inputs/day1.txt")))
print(day1.part1(input, 2020))
