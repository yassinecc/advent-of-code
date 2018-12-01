package advent16;

import java.util.ArrayList;
import java.util.HashSet;
import advent16.tools;

public class Day1 {

	public static void main(String[] args) {

		ArrayList<String> data = tools.readFile("input1.txt");
		String input = data.get(0);
		// input = "R8, R4, R4, R8"; // Test case
		String[] inst = input.split(", "); // Make array of instructions

		int state = 0; // 0 is North, 1 is East, 2 is South, 3 is West
		int x = 0; // Initial x-position on grid
		int y = 0; // Initial y-position on grid
		HashSet<String> set = new HashSet<String>();

		search: for (String el : inst) {
			char direction = el.charAt(0); // In which direction do we turn?
			int steps = Integer.parseInt(el.substring(1)); // How many steps do we take?
			// New state
			int turnRight = (direction == 'R') ? 1 : -1;
			state += turnRight;
			state = Math.floorMod(state, 4); // To have a state between 0 and 3
			for (int i = 1; i <= steps; i++) {
				switch (state) {
				case 0:
					y += 1;
					break;
				case 1:
					x += 1;
					break;
				case 2:
					y -= 1;
					break;
				case 3:
					x -= 1;
					break;
				}
				String position = Integer.toString(x) + "," + Integer.toString(y);
				if (set.contains(position)) {
					//System.out.println(position);
					break search; // Toggle this line on/off to switch between parts 1 and 2
				} else {
					set.add(position);
				}
			}
		}
		System.out.println("Distance is " + (Math.abs(x) + Math.abs(y)));
	}

}
