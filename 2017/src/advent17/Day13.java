package advent17;

import java.util.List;

public class Day13 extends tools {
  public static void main(String[] args) {
    List<String> inputFile = readFile("input13.txt");
    int severity = 0;
    int delay = 0;
    loop: while(true) {
      for(String el:inputFile) {
        int depth = Integer.parseInt(el.split(": ")[0]) + delay;
        int range = Integer.parseInt(el.split(": ")[1]);
        int positionAtArrival = range - 1 - Math.abs(range - 1 - depth%(2*(range-1)));
        if(positionAtArrival == 0) {
          severity+=depth*range;
          // delay++; // Part 2
          // continue loop; // Part 2
        }
      }
      break loop;
    }
    if(delay == 0 ) println("Total severity is " + severity);
    if(delay > 0 ) println("Delay to pass through is " + delay);
  }
}
