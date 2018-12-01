package advent17;

import java.util.Arrays;
import java.util.List;

public class Day2 extends tools {
  public static void main(String[] args ) {
    List<String> inputFile = readFile("input2.txt");
    int counter = 0;
    int counter2 = 0;
    for(String line:inputFile) {
      String[] stringArray = line.split("	"); // Tab character from input file, not space
      int[] intArray = Arrays.stream(stringArray).mapToInt(Integer::parseInt).toArray();
      Arrays.sort(intArray);
      counter+=(intArray[intArray.length - 1] - intArray[0]);
      loop : for(int i=0; i<intArray.length; i++) {
        int divider = intArray[i];
        int[] tempArray = Arrays.copyOfRange(intArray, i + 1, intArray.length);
        Integer[] moduloArray = Arrays.stream(tempArray).boxed().map(x -> Integer.valueOf(x % divider)).toArray(Integer[]::new);
        int index = Arrays.asList(moduloArray).indexOf(0);
        if(index>0) {
          counter2+=tempArray[index] / divider;
          continue loop;
        }
      }
    }
    println("First sum is " + counter);
    println("Second sum is " + counter2);
  }
}
