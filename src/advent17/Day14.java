package advent17;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Day14 extends Day10 {

  private static String binaryHash(String hexString) {
    String binaryHash = "";
    for (char c: hexString.toCharArray()) {
      BigInteger bigInt = new BigInteger(Character.toString(c), 16);
      String smallHash = String.format("%4s", bigInt.toString(2)).replace(' ', '0');
      binaryHash+=smallHash;
    }
    return binaryHash;
  }

  private static List<String> getLitNeighbours(List<String> hashGrid, Set<String> discovered, int i, int j) {
    List<String> result = new ArrayList<String>();
    if(hashGrid.get(i).charAt(j) == '1' && !discovered.contains(i + " " + j)) {
      discovered.add(i + " " + j);
      if (i<hashGrid.size() - 1) { // Not at the bottom
        result.addAll(getLitNeighbours(hashGrid, discovered, i+1, j));
      }
      if (i>0) { // Not at the top
        result.addAll(getLitNeighbours(hashGrid, discovered, i-1, j));
      }
      if (j<hashGrid.size() - 1) { // Not at the right
        result.addAll(getLitNeighbours(hashGrid, discovered, i, j+1));
      }
      if (j>0) { // Not at the left
        result.addAll(getLitNeighbours(hashGrid, discovered, i, j-1));
      }
    }
    return result;
  }

  public static void main(String[] args) {
    String inputFile = "ljoxqyyw";
    int gridSize = 128;
    int count = 0;
    List<String> hashGrid = new ArrayList<String>();
    for (int k=0; k<gridSize; k++) {
      String binaryHash = binaryHash(knotHash(inputFile + "-" + k));
      hashGrid.add(binaryHash);
      count+=binaryHash.replace("0", "").length();
    }

    println("There are " + count + " lit pixels");

    Set<String> discovered = new HashSet<String>();
    int groupCount = 0;
    for (int i=0; i<gridSize; i++) {
      for (int j=0; j<gridSize; j++) {
        if (hashGrid.get(i).charAt(j) == '1' && !discovered.contains(i + " " + j)) {
          groupCount++;
          getLitNeighbours(hashGrid, discovered, i, j);
        }
      }
    }
    
    println("There are " + groupCount + " regions of lit pixels");
  }
}
