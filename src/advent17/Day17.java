package advent17;

import java.util.ArrayList;
import java.util.List;

public class Day17 extends tools {
  public static void main(String[] args) {
    List<Integer> buffer = new ArrayList<Integer>();
    buffer.add(0);
    int stepSize = 328;
    int position = 0;
    for (int i=1; i<2018; i++) {
      position = (position + stepSize) % buffer.size();
      buffer.add(position + 1, i);
      position++;
    }
    println(buffer.get(buffer.indexOf(2017) + 1));

    int bufferSize = 1;
    int valueAfterZero = 0;
    position = 0;
    do {
      int quotient = (bufferSize - position) / stepSize;
      int remainder = (bufferSize - position) % stepSize;
      if(remainder == 0) {
        valueAfterZero = bufferSize + quotient;
        bufferSize+=quotient;
        position = 0;
      }
      else {
        bufferSize+=quotient + 1;
        position = (stepSize - remainder) % bufferSize;
      }
    } while (bufferSize<=50000000);
    println(valueAfterZero);
  }
}
