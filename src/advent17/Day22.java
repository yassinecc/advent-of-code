package advent17;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Day22 extends advent17.tools {
  public static int counter = 0;

  public static void main(String[] args) {
    List<String> inputFile = readFile("input22test.txt");
    int xStart = inputFile.get(0).length() / 2;
    int yStart = inputFile.size() / 2;
    int x = xStart;
    int y = yStart;
    String direction = "up";
    Pair<Integer, Integer> coord = new Pair<Integer, Integer>(x, y);
    Pair<Pair<Integer, Integer>, String> vectCoord = new Pair<Pair<Integer, Integer>, String>(coord, direction);
    List<List<String>> virusGrid = convertListTo2DList(inputFile);
    for (int i = 0; i < 10000; i++) {
      vectCoord = burst(vectCoord, virusGrid);
    }
    println(virusGrid.toString().replace("], ", "]\n").replace(",", "").replace("[", "").replace("]", ""));
    println(Day22.counter);
  }

  private static Pair<Integer, Integer> extendGrid(Pair<Pair<Integer, Integer>, String> vectCoord,
      List<List<String>> virusGrid) {
    Pair<Integer, Integer> coord = vectCoord.left;
    int x = coord.left;
    int y = coord.right;
    List<String> newLine = new ArrayList<String>();
    while (newLine.size() < virusGrid.size() + 1)
      newLine.add(".");
    if (x == -1) {
      virusGrid.add(0, newLine);
      return new Pair<Integer, Integer>(0, y);
    } else if (x == virusGrid.size()) {
      virusGrid.add(newLine);
      return coord;
    }

    else if (y == -1) {
      for (List<String> line : virusGrid) {
        line.add(0, ".");
      }
      return new Pair<Integer, Integer>(x, 0);
    } else if (y == virusGrid.get(0).size()) {
      for (List<String> line : virusGrid) {
        line.add(".");
      }
      return coord;
    } else
      return coord;
  }

  private static Pair<Pair<Integer, Integer>, String> burst(Pair<Pair<Integer, Integer>, String> vectCoord,
      List<List<String>> virusGrid) {

    Pair<Integer, Integer> coord = extendGrid(vectCoord, virusGrid);
    String direction = vectCoord.right;
    int x = coord.left;
    int y = coord.right;
    println(virusGrid.toString().replace("], ", "]\n").replace(",", "").replace("[", "").replace("]", ""));
    println("\n");
    direction = virusGrid.get(x).get(y).equals("#") ? turnRight(direction) : turnLeft(direction);
    virusGrid.get(x).set(y, virusGrid.get(x).get(y).equals("#") ? "." : "#");
    if (virusGrid.get(x).get(y).equals("#")) {
      Day22.counter++;
      println(Day22.counter);
    }
    x = updateX(x, direction);
    y = updateY(y, direction);
    Pair<Integer, Integer> newCoord = new Pair<Integer, Integer>(x, y);
    Pair<Pair<Integer, Integer>, String> newVectCoord = new Pair<Pair<Integer, Integer>, String>(newCoord, direction);
    return newVectCoord;
  }

  private static int updateX(int x, String direction) {
    switch (direction) {
    case "left":
    case "right":
    default:
      return x;

    case "down":
      return x + 1;

    case "up":
      return x - 1;
    }
  }

  private static int updateY(int y, String direction) {
    switch (direction) {
    case "up":
    case "down":
    default:
      return y;

    case "left":
      return y - 1;

    case "right":
      return y + 1;
    }
  }

  private static String turnRight(String direction) {
    switch (direction) {
    case "up":
      return "right";

    case "right":
      return "down";

    case "down":
      return "left";

    case "left":
      return "up";

    default:
      return "up";
    }
  }

  private static String turnLeft(String direction) {
    return turnRight(turnRight(turnRight(direction)));
  }

}
