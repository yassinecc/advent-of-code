package advent17;

public class Day9 extends tools {

  public static int nonCanceledChars=0;

  private static boolean isValid(String input, int index) {
    if(input.charAt(index - 1) != '!') return true;
    else {
      return !isValid(input, index - 1);
    }
  }

  private static int findEndIndex(String input, int startIndex) {
    int endIndex = input.indexOf('>', startIndex);
    if (!isValid(input, endIndex)) {
      endIndex = findEndIndex(input, endIndex + 1);
    }
    return endIndex;
  }

  private static String removeGarbage(String input) {
    int startIndex = input.indexOf('<');
    while (startIndex > -1) {
      int endIndex = findEndIndex(input, startIndex);
      int nonCanceledChars = endIndex - startIndex - 1 - countCanceledChars(input.substring(startIndex, endIndex + 1));
      Day9.nonCanceledChars+=nonCanceledChars;
      input =  input.substring(0, startIndex) + input.substring(endIndex + 1);
      startIndex = input.indexOf('<');
    }
    return input;
  }

  private static int countScore(String input) {
    int score = 0;
    int totalScore = 0;
    for(char c:input.toCharArray()) {
      if (c=='{') score++;
      else if (c=='}') {
        totalScore+=score;
        score--;
      }
    }
    return totalScore;
  }

  private static int countCanceledChars(String input) {
    int markIndex = input.indexOf('!');
    int canceledChars = 0;
    while(markIndex > -1) {
      canceledChars++;
      if(input.charAt(markIndex + 1) != '!' && !isValid(input, markIndex + 1)) {
        canceledChars++;
      }
      markIndex = input.indexOf('!', markIndex + 1);
    }
    return canceledChars;
  }

  public static void main(String[] args) {
    String inputFile = readFile("input9.txt").get(0);
    println("Total score is " + countScore(removeGarbage(inputFile).replace(",", "")));
    println("Non canceled chars: "+ Day9.nonCanceledChars);
  }
}
