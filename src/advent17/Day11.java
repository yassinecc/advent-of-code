package advent17;

public class Day11 extends tools {

  private static Pair<Integer, Integer> move(Pair<Integer, Integer> coord, String direction) {
    switch(direction) {
      case "n": {
        return new Pair<Integer, Integer>(coord.left, coord.right + 1);
      }
      case "s": {
        return new Pair<Integer, Integer>(coord.left, coord.right - 1);
      }
      case "ne": {
        return new Pair<Integer, Integer>(coord.left + 1, coord.right);
      }
      case "nw": {
        return new Pair<Integer, Integer>(coord.left - 1, coord.right + 1);
      }
      case "se": {
        return new Pair<Integer, Integer>(coord.left + 1, coord.right - 1);
      }
      case "sw": {
        return new Pair<Integer, Integer>(coord.left - 1, coord.right);
      }
      default: {
        return new Pair<Integer, Integer>(0, 0);
      }
    }
  }

  private static int distance(Pair<Integer, Integer> origin, Pair<Integer, Integer> point) {
    int dx = point.left - origin.left;
    int dy = point.right - origin.right;
    if(dx*dy > 0) {
      return Math.abs(dx + dy);
    }
    else {
      return Math.max(Math.abs(dx), Math.abs(dy));
    }
  }

  public static void main(String[] args) {
    String inputFile = readFile("input11.txt").get(0);
    String[] directions = inputFile.split(",");
    Pair<Integer, Integer> origin = new Pair<Integer, Integer>(0, 0);
    Pair<Integer, Integer> point = new Pair<Integer, Integer>(0, 0);
    int maxDistance = 0;
    for (String direction:directions) {
      point = move(point, direction);
      maxDistance = maxDistance < distance(origin, point) ? distance(origin, point) : maxDistance;
    }
    println("Final distance: " + distance(origin, point));
    println("Maximal distance: " + maxDistance);
  }
}
