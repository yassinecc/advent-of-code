package advent16;

public class Day5 extends tools {

	public static void main(String[] args) throws Exception {
		// final String input = "abc"; // Test case
		final String input = "uqwqemis";
		StringBuilder password = new StringBuilder("????????");
		int i = 0; // iteration number
		int j = 0; //number of filled letters in password

		while (j < 8) {
			String test = input + Integer.toString(i);
			String md5hash = getMD5Hex(test);
			//boolean cond = true; // Part 1
			boolean cond = md5hash.charAt(5) >= '0' && md5hash.charAt(5) < '8'
					&& password.charAt(Character.getNumericValue(md5hash.charAt(5))) == '?';

			if (md5hash.substring(0, 5).equals("00000") && cond) {
				//password.setCharAt(j, (md5hash.charAt(5))); // Part 1
				password.setCharAt(Character.getNumericValue(md5hash.charAt(5)), (md5hash.charAt(6))); // Part 2
				j++;
				println(password);
			}
			i++;
		}
		println("Password is " + password);
		return;
	}

}
