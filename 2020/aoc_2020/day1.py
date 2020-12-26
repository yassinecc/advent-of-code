def part1(input_array, target):
    """
    Finds the two elements from @input_array that sum up to @target
    and multiplies them
    """
    complementary_array = [target - x for x in input_array]
    matches = list(set(input_array) & set(complementary_array))
    if len(matches) == 1:
        matches.append(matches[0])
    return matches[0] * matches[1]


def part2(input_array, target):
    """
    Finds the three elements from @input_array that sum up to @target
    and multiplies them
    """
    for number in input_array:
        new_target = target - number
        complementary_array = [new_target - x for x in input_array]
        matches = list(set(input_array) & set(complementary_array))
        if len(matches) == 0:
            continue
        if len(matches) == 1:
            matches.append(matches[0])
        return number * matches[0] * matches[1]
