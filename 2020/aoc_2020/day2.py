def part1(input_array):
    """
    For each line in @input_array
    Extracts the relevant password policy and check that the password conforms to it
    """
    for password_line in input_array:
        policy_range, character, password = parse_password_line(password_line)
        min_policy, max_policy = parse_policy_range(policy_range)

        is_password_valid = password.count(character) in range(min_policy, max_policy + 1)
