package advent16;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;

@SuppressWarnings("unused")
public class Day6 extends tools {

	private static char mostFrequent(String in) {
		char[] chars = in.toCharArray();
		HashMap<Character, Integer> charSet = new HashMap<Character, Integer>();
		for (char c : chars) {
			Integer count = (charSet.containsKey(c)) ? charSet.get(c) + 1 : 1;
			charSet.put(c, count);
		}
		Set<Character> mapKeys = charSet.keySet();
		int val = 0;
		char result = '?';
		for (Character c : mapKeys) {
			int curVal = charSet.get(c);
			if (curVal > val) {
				val = curVal;
				result = c;
			}
		}
		return result;
	}

	private static char leastFrequent(String in) {
		char[] chars = in.toCharArray();
		HashMap<Character, Integer> charSet = new HashMap<Character, Integer>();
		for (char c : chars) {
			Integer count = (charSet.containsKey(c)) ? charSet.get(c) + 1 : 1;
			charSet.put(c, count);
		}
		Set<Character> mapKeys = charSet.keySet();
		int val = in.length();
		char result = '?';
		for (Character c : mapKeys) {
			int curVal = charSet.get(c);
			if (curVal < val) {
				val = curVal;
				result = c;
			}
		}
		return result;
	}

	public static void main(String[] args) {
		ArrayList<String> input = readFile("input6.txt");
		int length = input.get(0).length(); // How many columns do we have

		for (int j = 0; j < length; j++) {
			StringBuilder temp = new StringBuilder();

			for (String el : input) {
				temp.append(el.charAt(j));
			}
			char myChar = mostFrequent(temp.toString()); // Toggle between "mostFrequent" and "leastFrequent" for parts 1 and 2
			print(myChar);
		}
		println("");
	}

}
