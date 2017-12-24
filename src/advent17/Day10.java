package advent17;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

public class Day10 extends tools {


  private static void tieKnot(List<Integer> list, int position, int length) {
    if (position + length < list.size()) {
      Collections.reverse(list.subList(position, position + length));
    }
    else {
      // Rotating to the right
      Collections.rotate(list, list.size() - position); 
      // There are now `length` elements to reverse at the beginning
      Collections.reverse(list.subList(0, length));
      // We rotate back
      Collections.rotate(list, position - list.size());
    }
  }

  private static int[] knotRound(List<Integer> list, List<Integer> intElements, int position, int skipSize) {
    for (int length:intElements) {
      length = length % list.size();
      tieKnot(list, position, length);
      position+=length + skipSize;
      position = position % list.size();
      skipSize++;
    }
    int[] result = {position, skipSize};
    return result;
  }

  private static List<Integer> denseHash(List<Integer> asciiList) {
    if(max(asciiList)[0]>255 || min(asciiList)[0]<0) {
      throw new Error("Invalid range");
    }
    else if(asciiList.size() != 256) {
      throw new Error("Incorrect list size");
    }
    else {
      List<Integer> result = new ArrayList<Integer>();
      for (int i=0; i<16; i++) {
        Integer hashElement = 0;
        for(Integer number:asciiList.subList(16*i, 16*i + 16)) {
          hashElement^=number;
        }
        result.add(hashElement);
      }
      return result;
    }
  }

  private static String hexHash(List<Integer> denseHash) {
    String result = "";
    for(Integer number:denseHash) {
      String hex = Integer.toHexString(number);
      result+=hex.length() == 2 ? hex : "0" + hex;
    }
    return result;
  }

  public static void main(String[] args) {
    String inputFile = readFile("input10.txt").get(0);
    // String inputFile = "1,2,4";
    List<Integer> list = new ArrayList<Integer>();
    for(int i=0; i<256; i++) {
      list.add(i);
    }
    List<Integer> list2 = new ArrayList<Integer>(list);
    String[] elements = inputFile.split(",");
    List<Integer> intElements = Arrays.asList(parseToIntArray(elements));

    List<Integer> asciiList = new ArrayList<Integer>();
    for (char c:inputFile.toCharArray()) {
      asciiList.add( (int) c);
    }
    List<Integer> suffixes = new ArrayList<Integer>();
    suffixes.add(17);
    suffixes.add(31);
    suffixes.add(73);
    suffixes.add(47);
    suffixes.add(23);
    asciiList.addAll(suffixes);

    int skipSize = 0;
    int position = 0;
    knotRound(list, intElements, position, skipSize);
    println(list.get(0) * list.get(1));
    for(int i=0; i<64; i++) {
      int[] indices = knotRound(list2, asciiList, position, skipSize);
      position = indices[0];
      skipSize = indices[1];
    }
    println(hexHash(denseHash(list2)));
  }
}
