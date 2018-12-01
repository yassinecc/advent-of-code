package advent16;

import java.util.List;

public class Day18 extends tools{

	public static void main(String[] args) {
		List<String> input = readFile("input18.txt");
		int numLines = 400000;
		String lastLine = input.get(0);
		int count = lastLine.length() - lastLine.replace(".", "").length();
		for(int i=0; i<numLines - 1; i++){
			String newLine = "";
			String compLine = "." + lastLine + ".";
			for(int j=1; j<=lastLine.length(); j++){
				boolean safety = compLine.charAt(j-1)==compLine.charAt(j+1);
				if(safety){
					newLine = newLine + ".";
					count++;
				}
				else{
					newLine = newLine + "^";
				}
			}
			lastLine = newLine;
		}
		println("There are " + count +" safe tiles for " + numLines + " rows");

	}

}
