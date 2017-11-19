package advent16;

import java.util.HashMap;
import java.util.ArrayList;

public class Day2 extends tools {

	private static int norm(int x, int y) {
		return Math.abs(x) + Math.abs(y);
	}

	public static void main(String[] args) {
		ArrayList<String> input = readFile("input2.txt");
		//		ArrayList<String> input = new ArrayList<String>(); // Test case
		//		input.add("ULL");
		//		input.add("RRDDD");
		//		input.add("LURDL");
		//		input.add("UUUUD");
		int x = -2; // (0,0) is 5 in part 1, (-2,0) is 5 in part 2. The other numbers are positioned in coordinates
		int y = 0;
		HashMap<String, String> map = new HashMap<String, String>();
		//		map.put("-1x1", "1");
		//		map.put("0x1", "2");
		//		map.put("1x1", "3");
		//		map.put("-1x0", "4");
		//		map.put("0x0", "5");
		//		map.put("1x0", "6");
		//		map.put("-1x-1", "7");
		//		map.put("0x-1", "8");
		//		map.put("1x-1", "9");

		map.put("0x2", "1");
		map.put("-1x1", "2");
		map.put("0x1", "3");
		map.put("1x1", "4");
		map.put("-2x0", "5");
		map.put("-1x0", "6");
		map.put("0x0", "7");
		map.put("1x0", "8");
		map.put("2x0", "9");
		map.put("-1x-1", "A");
		map.put("0x-1", "B");
		map.put("1x-1", "C");
		map.put("0x-2", "D");

		for (int i = 0; i < input.size(); i++) { // Loops over instruction lines
			String curStr = input.get(i);

			for (int j = 0; j < curStr.length(); j++) { // Loops over instruction characters
				char direction = curStr.charAt(j);

				switch (direction) {
				//				case 'U': y = Math.min(y+1, 1); break; // move up
				//				case 'R': x = Math.min(x+1, 1); break; // move right
				//				case 'D': y = Math.max(y-1, -1); break; // move down
				//				case 'L': x = Math.max(x-1, -1); break; // move left

				case 'U':
					y = (norm(x, y + 1) > 2) ? y : y + 1;
					break;
				case 'R':
					x = (norm(x + 1, y) > 2) ? x : x + 1;
					break;
				case 'D':
					y = (norm(x, y - 1) > 2) ? y : y - 1;
					break;
				case 'L':
					x = (norm(x - 1, y) > 2) ? x : x - 1;
					break;
				}
			}
			String PosString = "" + x + "x" + y;
			String val = map.get(PosString);
			print(val);
		}
		println("");
	}
}
