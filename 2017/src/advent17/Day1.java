package advent17;

public class Day1 extends tools {
  public static void main (String [] args) {
    String inputFile = readFile("input1.txt").get(0);
    // String inputFile = "123123";
    // int shiftLength = inputFile.length() - 1;
    int shiftLength = inputFile.length()/2;
    String shiftedInput = inputFile.substring(shiftLength) + inputFile.substring(0, shiftLength);

    int counter = 0;
    for(int i=0; i<inputFile.length(); i++) {
      boolean sameDigits = shiftedInput.charAt(i) == inputFile.charAt(i);
      counter+= sameDigits ? shiftedInput.charAt(i) - '0' : 0 ;
      // println("here " + counter);
    }
    println(counter);
  }
}
