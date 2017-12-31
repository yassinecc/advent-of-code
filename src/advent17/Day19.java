package advent17;

import java.util.List;

public class Day19 extends tools {

  static String discovered = "";
  static int x;
  static int y = 0;
  static int steps = 0;
  static boolean horizontal = true;
  static boolean rightDown = true;

  public static void main(String[] args) {
    List<String> inputFile = readFile("input19.txt");
    x = inputFile.get(y).indexOf('|');
    while (true) {
      if (findPlus(inputFile, x, y, !horizontal, rightDown))
        break;
    }
    println(discovered);
    println(steps);
  }

  private static boolean findPlus(List<String> inputFile, int x, int y, boolean horizontal, boolean rightDown) {
    // Returns a straight path string ending with a plus sign
    String lineString;
    int xStart;
    int xEnd;
    int yStart;
    int yEnd;
    boolean shouldBreak = false;
    if (horizontal) {
      lineString = inputFile.get(y);
      if (rightDown) {
        xStart = x;
        xEnd = lineString.indexOf("+", x + 1);
        lineString = lineString.substring(xStart, xEnd + 1);
        Day19.x = xEnd;
        Day19.rightDown = inputFile.get(y - 1).charAt(xEnd) == ' ';
      } else {
        xStart = lineString.lastIndexOf('+', x - 1);
        xEnd = x;
        lineString = reverse(lineString.substring(xStart, xEnd + 1));
        Day19.x = xStart;
        Day19.rightDown = inputFile.get(y - 1).charAt(xStart) == ' ';
      }
      Day19.steps += xEnd - xStart;
    } else {
      lineString = getVerticalString(inputFile, x);
      if (rightDown) {
        yStart = y;
        yEnd = lineString.indexOf('+', y + 1);
        lineString = lineString.substring(yStart, yEnd + 1);
        Day19.y = yEnd;
        Day19.rightDown = inputFile.get(yEnd).charAt(x - 1) == ' ';
      } else {
        yStart = lineString.lastIndexOf('+', y - 1);
        yEnd = y;
        lineString = reverse(lineString.substring(yStart, yEnd + 1));
        Day19.y = yStart;
        Day19.rightDown = inputFile.get(yStart).charAt(x - 1) == ' ';
      }
      Day19.steps += yEnd - yStart;
    }
    Day19.discovered += lineString.replaceAll("[+|-]", "");
    if (lineString.indexOf(' ') > -1) {
      Day19.steps -= lineString.indexOf('+', 1) - lineString.indexOf(' ');
      shouldBreak = true;
    }
    Day19.horizontal = !Day19.horizontal;
    return shouldBreak;
  }

  private static String getVerticalString(List<String> inputFile, int x) {
    String result = "";
    for (int i = 0; i < inputFile.size(); i++) {
      result += inputFile.get(i).charAt(x);
    }
    return result;
  }
}
