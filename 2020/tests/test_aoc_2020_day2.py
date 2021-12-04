from aoc_2020 import day2


def test_day2_part1():
    assert (day2.part1("1-3", "a", "abcde")) is True
    assert (day2.part1("1-3", "b", "cdefg")) is True
    assert (day2.part1("2-9", "c", "ccccccccc")) is True
