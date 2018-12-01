package advent16;
import java.util.ArrayList;

public class Day8 extends tools{

	private static void fill(boolean[][] screen, String dim){
		String[] dims = dim.split("x");
		int width = Integer.parseInt(dims[0]);
		int height = Integer.parseInt(dims[1]);
		for(int i=0; i<height; i++){
			for(int j=0; j<width; j++){
				screen[i][j] = true;
			}
		}
	}

	private static void rotate(boolean[][] screen, String type, int coord, int dist){
		switch(type){
		case "row":{
			int width = screen[0].length;
			boolean[] newRow = new boolean[width];

			for(int j=0; j<width; j++){ // j is newRow's length
				int adjust = (j<dist) ? width : 0;
				newRow[j] = screen[coord][(j-dist) + adjust];
			}
			for(int j=0; j<width; j++){
				screen[coord][j] = newRow[j];
			}

			break;
		}
		case "column":{
			int height = screen.length;
			boolean[] newColumn = new boolean[height];
			for(int i=0; i<height; i++){
				int adjust = (i<dist) ? height : 0;
				newColumn[i] = screen[(i-dist) + adjust][coord];
			}
			for(int i=0; i<height; i++){
				screen[i][coord] = newColumn[i];
			}
			break;
		}
		}
	}

	private static void display(boolean[][] screen, int height, int width){
		for(int i=0; i<height; i++){
			for(int j=0; j<width; j++){
				char toPrint = (screen[i][j]) ? '#' : '.';
				print(toPrint);
			}
			println("");
		}
	}

	public static void main(String[] args) {
		ArrayList<String> input = readFile("input8.txt");
		int height = 6;
		int width = 50;
		boolean[][] screen = new boolean[height][width];

		for(String el:input){
			
			String[] parts = el.split(" ");
			if(parts[0].equals("rect")){
				fill(screen, parts[1]);		
			}
			else{
				String type = parts[1];
				int coord = Integer.parseInt(parts[2].split("=")[1]);
				int dist = Integer.parseInt(parts[4]);
				rotate(screen, type, coord, dist);
			}
		}
		int ctr = 0;
		for(int i=0; i<height; i++){
			for(int j=0; j<width; j++){
				if(screen[i][j]){
					ctr++;
				}
			}
		}
		display(screen, height, width);
		println(ctr + " pixels are lit");
	}

}
