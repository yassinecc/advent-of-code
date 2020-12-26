def part1(input_array, target):
    """
    Finds the two elements from @input_array that sum up to @target
    and multiplies them
    """
    complementary_array = [target - x for x in input_array]
    matches = list(set(input_array) & set(complementary_array))

    if len(matches) == 0:
        return None
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
        matching_pair = part1(input_array, new_target)
        if matching_pair is None:
            continue
        return number * matching_pair
