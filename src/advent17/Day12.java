package advent17;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Day12 extends tools {

  private static void connect(List<String> inputFile, Set<Integer> programSet, int position) {
    String allConnected = inputFile.get(position).split(" <-> ")[1];
    String[] connectedPrograms = allConnected.split(", ");
    for (String node:connectedPrograms) {
      int intNode = Integer.parseInt(node);
      if(!programSet.contains(intNode)) {
        programSet.add(intNode);
        connect(inputFile, programSet, intNode);
      }
    }
  }

  public static void main(String[] args) {
    List<String> inputFile = readFile("input12.txt");
    int position = 0;
    int counter = 0;
    Set<Integer> discoveredSet = new HashSet<Integer>();
    while (position < inputFile.size()) {
      Set<Integer> programSet = new HashSet<Integer>();
      programSet.add(position);
      connect(inputFile, programSet, position);
      if(position == 0) {
        println("There are " + programSet.size() + " programs connected to program 0");
      }
      discoveredSet.addAll(programSet);
      while (discoveredSet.contains(position)) {
        position++;
      }
      counter++;
    }
    println("There are " + counter + " groups in total");
  }
}
