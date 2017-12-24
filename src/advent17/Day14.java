package advent17;

import java.math.BigInteger;

public class Day14 extends Day10 {

private static int hexBitCount(String hexString) {
  int count = 0;
  for (char c: hexString.toCharArray()) {
    BigInteger intt = new BigInteger(Character.toString(c), 16);
    count+=Integer.bitCount(intt.intValue());
  }
  return count;
}

  public static void main(String[] args) {
    String inputFile = "ljoxqyyw";
    int gridSize = 128;
    int count = 0;
    for (int i=0; i<gridSize; i++) {
      String hash = knotHash(inputFile + "-" + i);
      count+=hexBitCount(hash);
    }
    hexBitCount("a0c2017");
    println(count);
  }
}
