package advent16;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Set;
import java.util.HashSet;
import java.util.Queue;
import java.util.LinkedList;

public class Day24 extends tools {
  static List<String> inputFile = tools.readFile("input24.txt");
  static int height = inputFile.size();
  static int width = inputFile.get(0).length();
  static List<Pair<Integer, Integer>> locationsArray = new ArrayList<Pair<Integer, Integer>>();
  static char[][] grid = fillGrid(inputFile, locationsArray);

  public class Cell {
		private final int x;
		private final int y;
		private final String path;

		public Cell(int _x, int _y, String _path){
			this.x = _x;
			this.y = _y;
			this.path = _path;
		}

		private Cell(Cell parent, char direction) {

			switch(direction){
			case 'U' : {
				this.x = parent.x;
				this.y = parent.y - 1;
				break;
			}
			case 'D' : {
				this.x = parent.x;
				this.y = parent.y + 1;
				break;
			}
			case 'L' : {
				this.x = parent.x - 1;
				this.y = parent.y;
				break;
			}
			case 'R' : {
				this.x = parent.x + 1;
				this.y = parent.y;
				break;
			}
			default : {
				this.x = parent.x;
				this.y = parent.y;
				break;
			}
			}
			this.path = parent.path + direction;
		}
    
    private boolean isWall() {
      return Day24.grid[x][y]=='#';
    }

		private Set<Cell> nextMoves() {
			Set<Cell> newCellSet = new HashSet<Cell>();
			String directions = "UDLR";

			for(int i=0; i<4; i++) {
        char direction = directions.charAt(i);
        Cell nextCell = new Cell(this, direction);
				if(!nextCell.isWall()){
					newCellSet.add(nextCell);
				}
			}
			return newCellSet;
		}
	}

  private static char[][] fillGrid(List<String> inputFile, List<Pair<Integer, Integer>> locationsArray) {
    int height = inputFile.size();
    int width = inputFile.get(0).length();
    char[][] grid = new char[width][height];
    Map<Integer, Pair<Integer, Integer>> locations = new HashMap<Integer,Pair<Integer, Integer>>();
    int j = 0;
    for(String line:inputFile) {
      int i = 0;
      for(char character:line.toCharArray()) {
        grid[i][j] = character;
        if(isInteger(String.valueOf(character))) {
          int number = Character.getNumericValue(character);
          Pair<Integer, Integer> coordinates = new Pair<Integer, Integer>(i,j);
          locations.put(number, coordinates);
        }
        i++;
      }
      j++;
    }
    for(int key:locations.keySet()){
      locationsArray.add(locations.get(key));
    }
    return grid;
  }

  private static Cell BFS(char[][] grid, Pair<Integer, Integer> start, Pair<Integer, Integer> finish) {
    Set<String> checked = new HashSet<String>();
    Queue<Cell> queue = new LinkedList<Cell>();
    Day24 puzzle = new Day24();
    Cell startingCell = puzzle.new Cell(start.left, start.right, "");
    checked.add(start.left + " " +start.right);
    queue.add(startingCell);

    while(!queue.isEmpty()) {
      Cell currentCell = queue.poll();
      if(currentCell.x==finish.left && currentCell.y==finish.right) {
        return currentCell;
      }
      Set<Cell> nextMoves = currentCell.nextMoves();
      for(Cell next:nextMoves) {
        if(!checked.contains(next.x + " " + next.y)) {
          checked.add(next.x + " " + next.y);
          queue.add(next);
        }
      }
    }
    return startingCell;
  }

  private static void fillMinDistances(List<Pair<Integer, Integer>> locationsArray, char[][] grid, int[][] minDistances) {
    for(int i=0; i<locationsArray.size(); i++){
      Pair<Integer, Integer> location = locationsArray.get(i);
      for(int j=i+1; j<locationsArray.size(); j++){
        Pair<Integer, Integer> secondLocation = locationsArray.get(j);
        Cell result = BFS(grid, location, secondLocation);
        minDistances[i][j] = result.path.length();
        minDistances[j][i] = result.path.length();
      }
    }
  }

  private static int shortestPath(int[][] minDistances, List<Integer> locationsList, int start) {
    int result = 100000;
    if(locationsList.size()==1){
      int end = locationsList.get(0);
      result = minDistances[start][end];
      result+=minDistances[end][0]; // Part 2
    }
    else {
      List<Integer> reducedList = new ArrayList<Integer>(locationsList);
      reducedList.remove((Integer) start);
      for(Integer newStart:reducedList) {
        int shortPathCandidate = shortestPath(minDistances, reducedList, newStart);
        int candidate = minDistances[start][newStart] + shortPathCandidate;
        result = candidate<result ? candidate : result;
      }
  }
    return result;
  }

  public static void main(String[] args){
    List<String>                  inputFile = tools.readFile("input24.txt");
    List<Pair<Integer, Integer>>  locationsArray = new ArrayList<Pair<Integer, Integer>>();
    char[][]                      grid = fillGrid(inputFile, locationsArray);
    List<Integer>                 locationsList = new ArrayList<Integer>();
    int[][]                       minDistances = new int[locationsArray.size()][locationsArray.size()]; // Symmetrical array

    fillMinDistances(locationsArray, grid, minDistances);

    for(int i=0; i<8; i++) {
      locationsList.add(i);
    }

    println("Length of the shortest path : " + shortestPath(minDistances, locationsList, 0));
    
  }
}
