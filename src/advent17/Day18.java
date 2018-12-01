package advent17;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Day18 extends tools {

  static long sound = 0;
  static int position = 0;

  public static void main(String[] args) throws InterruptedException {
    List<String> inputFile = readFile("input18.txt");
    Map<String, Long> registerMap = new HashMap<String, Long>();
    while(Day18.position > -1 && Day18.position < inputFile.size()) {
      if(!apply(registerMap, inputFile)) {
        break;
      }
      Day18.position++;
    }
  }

  private static boolean apply(Map<String, Long> registerMap, List<String> instructions) {
    String instruction = instructions.get(Day18.position);
    String type = instruction.split(" ")[0];
    boolean advance = true;
    switch (type) {
      case "snd" :{
        String register = instruction.split(" ")[1];
        Day18.sound = extractInt(registerMap, register);
        break;
      }
      case "set" :{
        String target = instruction.split(" ")[1];
        String register = instruction.split(" ")[2];
        registerMap.put(target, extractInt(registerMap, register));
        break;
      }
      case "add" :{
        String target = instruction.split(" ")[1];
        String register = instruction.split(" ")[2];
        long targetValue = extractInt(registerMap, target);
        registerMap.put(target, targetValue + extractInt(registerMap, register));
        break;
      }
      case "mul" :{
        String target = instruction.split(" ")[1];
        String register = instruction.split(" ")[2];
        long targetValue = extractInt(registerMap, target);
        registerMap.put(target, targetValue * extractInt(registerMap, register));
        break;
      }
      case "mod" :{
        String target = instruction.split(" ")[1];
        String register = instruction.split(" ")[2];
        long targetValue = extractInt(registerMap, target);
        registerMap.put(target, targetValue % extractInt(registerMap, register));
        break;
      }
      case "rcv" :{
        String register = instruction.split(" ")[1];
        if(extractInt(registerMap, register) != 0) {
          println(Day18.sound);
          advance = false;
        }
        break;
      }
      case "jgz" :{
        String target = instruction.split(" ")[1];
        String register = instruction.split(" ")[2];
        if(extractInt(registerMap, target) > 0) {
          Day18.position+=extractInt(registerMap, register) - 1;
        }
        break;
      }
    }
    return advance;
  }

  private static Long extractInt(Map<String, Long> registerMap, String register) {
    if(isInteger(register)) {
      return (long) Integer.parseInt(register);
    }
    else {
      if(!registerMap.containsKey(register)) {
        registerMap.put(register, (long) 0);
      }
      return registerMap.get(register);
    }
  }
}
