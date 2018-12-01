package advent17;

import java.util.HashSet;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.List;

public class Day4 extends tools {
  @SuppressWarnings("unused")
  private static Map<Character, Integer> letterMap(String word) {
    Map<Character, Integer> result = new HashMap<Character, Integer>();
    for(char c:word.toCharArray()) {
      if (result.containsKey(c)) {
        result.put(c, result.get(c) + 1);
      }
      else {
        result.put(c, 1);
      }
    }
    return result;
  }
  private static boolean isValid(String pass) {
    boolean isValid = true;
    String[] words = pass.split(" ");
    Set<String> uniqueWords = new HashSet<String>();
    // Set<Map<Character, Integer>> uniqueWords = new HashSet<Map<Character, Integer>>(); // For part 2
    loop : for(int i=0; i<words.length; i++) {
      String word = words[i];
      if(uniqueWords.contains(word)) {
      // if(uniqueWords.contains(letterMap(word))) {
        isValid = false;
        break loop;
      }
      else {
        uniqueWords.add(word);
        // uniqueWords.add(letterMap(word));
      }
    }
    return isValid;
  }
  public static void main(String[] args) {
    List<String> inputFile = readFile("input4.txt");
    int counter = 0;
    for(String element:inputFile) {
      if (isValid(element)) counter++;
    }
    println("There are " + counter + " valid passphrases");
  }
}
