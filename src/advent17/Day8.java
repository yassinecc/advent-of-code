package advent17;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Day8 extends tools {

  private static boolean parseCondition(Map<String, Integer> registerMap, String condition) {
    String[] elements = condition.split(" ");
    if (!registerMap.containsKey(elements[0])) {
      registerMap.put(elements[0], 0);
    }
    int registerValue = registerMap.get(elements[0]);
    int compareValue = Integer.parseInt(elements[2]);
    switch (elements[1]) {
      case ">" :
      return registerValue > compareValue;
      case "<" :
      return registerValue < compareValue;
      case ">=" :
      return registerValue >= compareValue;
      case "<=" :
      return registerValue <= compareValue;
      case "==" :
      return registerValue == compareValue;
      case "!=" :
      return registerValue != compareValue;
      default: return false;
    }
  }

  private static void apply(Map<String, Integer> registerMap, String operation, boolean condition) {
    String[] elements = operation.split(" ");
    if (!registerMap.containsKey(elements[0])) {
      registerMap.put(elements[0], 0);
    }
    if (condition) {
      int registerValue = registerMap.get(elements[0]);
      int operationValue = Integer.parseInt(elements[2]);
      switch (elements[1]) {
        case "inc" :
        registerMap.put(elements[0], registerValue + operationValue); break;
        case "dec" :
        registerMap.put(elements[0], registerValue - operationValue); break;
      }
    }
  }

  public static void main(String[] args) {
    List<String> inputFile = readFile("input8test.txt");
    Map<String, Integer> registerMap = new HashMap<String, Integer>();
    int processMax = 0;
    for(String s:inputFile) {
      String[] elements = s.split(" if ");
      boolean condition = parseCondition(registerMap, elements[1]);
      apply(registerMap, elements[0], condition);
      List<Integer> valuesList = new ArrayList<Integer>();
      valuesList.addAll(registerMap.values());
      processMax = processMax > max(valuesList)[0] ? processMax : max(valuesList)[0];
    }
    List<Integer> valuesList = new ArrayList<Integer>();
    valuesList.addAll(registerMap.values());
    println("Maximal value is " + max(valuesList)[0]);
    println("Process maximal value is " + processMax);
  }
}
