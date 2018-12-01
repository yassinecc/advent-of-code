package advent17;

public class Day15 extends tools {
  public static void main(String[] args) {
    long seedA = 591;
    long seedB = 393;
    int factorA = 16807;
    int factorB = 48271;
    int divisor = 2147483647;
    int counter = 0;
    int iterations = 40000000;
    for(int i=0; i<iterations; i++) {
        seedA = (seedA * factorA) % divisor;
        seedB = (seedB * factorB) % divisor;
      if ((seedA & 0xffff) == (seedB & 0xffff)) {
        counter++;
      }
    }
    println(counter);

    seedA = 591;
    seedB = 393;
    iterations = 5000000;
    counter = 0;
    for(int i=0; i<iterations; i++) {
      do {
        seedA = (seedA * factorA) % divisor;
      } while(seedA % 4 > 0);
      do {
        seedB = (seedB * factorB) % divisor;
      } while(seedB % 8 > 0);
      if ((seedA & 0xffff) == (seedB & 0xffff)) {
        counter++;
      }
    }
    println(counter);
  }
}
