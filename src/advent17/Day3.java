package advent17;

public class Day3 extends tools {
  private static int[] positions(int number) {
    int[] result = {0,0};
    if(number>1) {
    int order = (int) Math.ceil(Math.sqrt(number));
    if(order%2 == 0) {
      order++;
    }
    int corner = order*order;
    int border = (order-1)/2;
    int difference = (corner - number) / (order - 1);
    int modulo = (corner - number) % (order - 1);
    int x = 0;
    int y = 0;
    switch(difference) {
      case 0 : {
        x = border - modulo;
        y = -border;
        break;
      }
      case 1: {
        x = - border;
        y = modulo - border;
        break;
      }
      case 2: {
        x = modulo - border;
        y = border;
        break;
      }
      case 3:{
        x = border;
        y = border - modulo;
        break;
      }
    }
    result[0] = x;
    result[1] = y;
    }
    return result;
  }
  private static int manhattanDistance(int[] point, int[] source) {
    return Math.abs(point[0] - source[0]) + Math.abs(point[1] - source[1]);
  }
  public static void main(String[] args) {
    int input = 368078;
    int[] source = {0,0};
    println(manhattanDistance(positions(input), source));
    println(manhattanDistance(positions(1), source));
    println(manhattanDistance(positions(12), source));
    println(manhattanDistance(positions(23), source));
    println(manhattanDistance(positions(1024), source));
  }
}
