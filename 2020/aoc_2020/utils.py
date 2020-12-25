import os
import os.path

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))


def read_file(filename):
    with open(os.path.join(__location__, filename)) as file:
        lines = [line.rstrip() for line in file]
    return lines
