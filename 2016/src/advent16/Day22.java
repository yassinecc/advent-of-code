package advent16;

import java.util.List;

public class Day22 extends tools {

	private static int getProp(String s, int i) {
		String[] splitted = s.split("\\s+");
		String ss = splitted[i];
		int result = Integer.parseInt(ss.substring(0, ss.length() - 1));
		return result;
	}
	
	private static int getY(String s) {
		String[] splitted = s.split("\\s+");
		String ss = splitted[0].split("y")[1];
		return Integer.parseInt(ss);
	}

	private static int used(String s) {
		return getProp(s, 2);
	}

	private static int avail(String s) {
		return getProp(s, 3);
	}

	public static void main(String[] args) {
		List<String> input = readFile("input22.txt");
		int count = 0;

		for(int i=2; i<input.size(); i++) {
			String ref = input.get(i);
			int used = used(ref);
			if(used>0) {
				for(int j=2; j<input.size(); j++) {
					if(j!=i){
						String el = input.get(j);
						int avail = avail(el);
						count+= avail<used ? 0 : 1;
					}
				}
			}
			
			if(getY(ref)%29==0) {
				println("");
			}
			
			if(used==0) {
				print("_");
			}
			else if(used>100) {
				print("#");
			}
			else {
				print(".");
			}
		}
		println("");
		println("There are " + count + " viable pairs.");
		// Part two is 57 (bringing the empty cell in front of the target data)
		// + 1 (initialization)
		// + 5*31 (31 moving units)
		// = 213
	}

}
