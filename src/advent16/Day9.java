package advent16;
import java.util.ArrayList;

public class Day9 extends tools{

	private static long getLength(String in, boolean part2){
		int i = 0;
		long result = 0;
		while(i < in.length()){
			int leftBrIdx = in.indexOf('(', i);
			int rightBrIdx = in.indexOf(')', i);
			
			if(leftBrIdx>-1){
				result+= leftBrIdx - i;
				int firstDim = Integer.parseInt(in.substring(leftBrIdx + 1, rightBrIdx).split("x")[0]);
				int secDim = Integer.parseInt(in.substring(leftBrIdx + 1, rightBrIdx).split("x")[1]);
				String midString = in.substring(rightBrIdx + 1, rightBrIdx + firstDim + 1);
				long inc = (part2) ? getLength(midString, true) : firstDim;
				result+= secDim*inc;
				i = rightBrIdx + firstDim + 1;
			}
			else{
				result = in.length();
				break;
			}
		}
		return result;
	}

	public static void main(String[] args) {
		ArrayList<String> input = readFile("input9.txt");
		String inFile = input.get(0);

		println(getLength(inFile, false)); // Part 1
		println(getLength(inFile, true)); // Part 2
	}

}
