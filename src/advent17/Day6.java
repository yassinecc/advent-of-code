package advent17;

import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;

public class Day6 extends tools {

  private static List<Integer> redistribute(List<Integer> banks) {
    int distributable = max(banks)[0]; 
    int startIndex = (max(banks)[1] + 1) % banks.size();
    int endIndex = (startIndex + distributable % banks.size()  - 1) % banks.size();
    int commonIncrement = distributable / banks.size();
    List<Integer> result = new ArrayList<>();
    for(int i=0; i<banks.size(); i++) {
      int newValue = banks.get(i) + commonIncrement;
      int indicesDiff = endIndex - startIndex;
      if(indicesDiff >=0 && indicesDiff<banks.size() - 1) {
        if(i>=startIndex && i<=endIndex) newValue++;
      }
      else if(indicesDiff < -1) {
        if(i>=startIndex || i<=endIndex) newValue++;
      }
      result.add(newValue);
    }
    int toSet = result.get(max(banks)[1]) - distributable;
    result.set(max(banks)[1], toSet);
    return result;
  }

  public static void main(String[] args) {
    String inputFile = readFile("input6.txt").get(0);
    List<Integer> banksList = new ArrayList<Integer>();
    for ( String s: inputFile.split(" ") ) {
      banksList.add(Integer.parseInt(s));
    }
    List<List<Integer>> visitedList = new ArrayList<List<Integer>>();
    visitedList.add(banksList);
    loop : while (true) {
      List<Integer> newList = redistribute(banksList);
      if (visitedList.contains(newList)) {
        println("Distributions needed " + visitedList.size());
        println("Loop size " + (visitedList.size() - visitedList.indexOf(newList)));
        break loop;
      }
      else {
        visitedList.add(newList);
        banksList = newList;
      }
    }
  }
}
