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
