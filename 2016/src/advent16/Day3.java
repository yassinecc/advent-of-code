package advent16;
import java.util.ArrayList;
import java.util.Arrays;

public class Day3 extends tools{

	private static int[][] transpose(ArrayList<String> array){
		int[][] result = new int[array.size()][3];
		for(int i=0; i<array.size(); i++){
			String el = array.get(i);
			String[] elements = el.trim().split(" +");
			for(int j=0; j<3; j++){
				// result[i][j] = Integer.parseInt(elements[j]); // Switches between part 1 and 2
				result[j+3*(i/3)][i%3] = Integer.parseInt(elements[j]);
			}
		}
		return result;
	}

	public static void main(String[] args){
		ArrayList<String> input = readFile("input3.txt");
		int[][] intInput = transpose(input);
		int ctr = 0;
		for(int i=0; i<input.size(); i++){
			int[] int_sides = {intInput[i][0], intInput[i][1], intInput[i][2]};
			int max = Arrays.stream(int_sides).max().getAsInt();
			int sum = Arrays.stream(int_sides).sum() - max;
			ctr+= (sum>max) ? 1:0;
		}
		println(ctr);
	}
}
