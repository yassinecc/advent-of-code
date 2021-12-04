from aoc_2020 import day1


def test_day1_part1():
    assert day1.part1([1721, 979, 366, 299, 675, 1456], 2020) == 514579
    assert day1.part1([1010, 979, 366], 2020) == 1020100


def test_day1_part2():
    assert day1.part2([1721, 979, 366, 299, 675, 1456], 2020) == 241861950
