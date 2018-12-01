package advent17;

public class Day16 extends tools {

  public static void main(String[] args) {
    String[] moves = readFile("input16.txt").get(0).split(",");
    String dancers = "abcdefghijklmnop";
    int iterations = 1000000000;
    loop : for(int cycleLength=1; cycleLength<iterations; cycleLength++) {
      dancers = dance(moves, dancers);
      if(cycleLength == 1) {
        println("After one dance : " + dancers);
      }
      if (dancers.equals("abcdefghijklmnop")) {
        int smallIterations = iterations % cycleLength;
        for (int j=0; j<smallIterations; j++) {
          dancers = dance(moves, dancers);
        }
        break loop;
      }
    }
    println("After many dances : " + dancers);
  }

  private static String dance(String[] moves, String dancers) {
    for(String move:moves) {
      switch(move.charAt(0)) {
        case 's' : {
          int size = Integer.parseInt(move.substring(1));
          dancers = spin(dancers, size);
          break;
        }
        case 'x' : {
          String[] positions = move.substring(1).split("/");
          int firstPos = Integer.parseInt(positions[0]);
          int secondPos = Integer.parseInt(positions[1]);
          dancers = exchange(dancers, firstPos, secondPos);
          break;
        }
        case 'p' : {
          String[] partners = move.substring(1).split("/");
          String firstString = partners[0];
          String secondString = partners[1];
          dancers = partner(dancers, firstString, secondString);
          break;
        }
      }
    }
    return dancers;
  }

  private static String spin(String dancers, int size) {
    int startIndex = dancers.length() - size;
    return dancers.substring(startIndex) + dancers.substring(0, startIndex);
  }

  private static String exchange(String dancers, int firstPos, int secondPos) {
    char firstChar = dancers.charAt(firstPos);
    char secondChar = dancers.charAt(secondPos);
    return dancers.replace(firstChar, '+').replace(secondChar, firstChar).replace('+', secondChar);
  }

  private static String partner(String dancers, String firstString, String secondString) {
    return dancers.replace(firstString, "+").replace(secondString, firstString).replace("+", secondString);
  }
}
