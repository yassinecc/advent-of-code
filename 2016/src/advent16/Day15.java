package advent16;

import java.util.ArrayList;

public class Day15 extends tools{
	public static void main(String[] args){
		ArrayList<String> input = readFile("input15b.txt");
		int i = 1;
		int sol = 0;
		int mod = 1;
		
		for(String line:input){
			String[] elements = line.substring(0, line.length()-1).split(" ");
			int numPos = Integer.parseInt(elements[3]);
			int initPos = Integer.parseInt(elements[elements.length - 1]);
			
			while((sol + initPos + i)%numPos!=0){
				sol+=mod;
			}
			mod*=numPos;
			i++;
		}
		println(sol);
	}
}
