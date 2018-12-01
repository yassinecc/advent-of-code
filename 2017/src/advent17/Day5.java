package advent17;

import java.util.List;

public class Day5 extends tools {
  public static void main(String[] args) {
    List<String> inputFile = readFile("input5.txt");
    int[] instructionsList = new int[inputFile.size()];
    int i = 0;
    for ( String s:inputFile ) {
      instructionsList[i++] = Integer.parseInt(s);
    }
    int position = 0;
    int counter = 0;
    while ( position>=0 && position < inputFile.size() ) {
      int offset = instructionsList[position];
      instructionsList[position]++; 
      // instructionsList[position]+= offset < 3 ? 0 : -2; 
      position+=offset;
      counter++;
    }
    println(counter);
  }
}
