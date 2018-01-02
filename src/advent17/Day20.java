package advent17;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Day20 extends tools {
  public static void main(String[] args) {
    List<String> inputFile = readFile("input20.txt");
    List<Triplet> positions = new ArrayList<Triplet>();
    List<Triplet> velocities = new ArrayList<Triplet>();
    List<Triplet> accelerations = new ArrayList<Triplet>();
    println(closestParticleIndex(inputFile, positions, velocities, accelerations));
    int i = 0;
    while (i < 10000000) {
      Map<Triplet, List<Integer>> toRemove = update(positions, velocities, accelerations);
      List<Integer> toRemoveList = new ArrayList<Integer>();
      for (List<Integer> tripletList : toRemove.values()) {
        if (tripletList.size() > 1) {
          toRemoveList.addAll(tripletList);
        }
      }
      removeByIndices(positions, toRemoveList);
      // println("Map " + toRemoveList);
      if (i % 1000 == 0)
        println(positions.size());
      i++;
    }
    println(positions.size());
  }

  private static Map<Triplet, List<Integer>> update(List<Triplet> positions, List<Triplet> velocities,
      List<Triplet> accelerations) {
    Map<Triplet, List<Integer>> toRemove = new HashMap<Triplet, List<Integer>>();
    for (int i = 0; i < positions.size(); i++) {
      Triplet newVelocity = velocities.get(i).add(accelerations.get(i));
      velocities.set(i, newVelocity);
      Triplet newPosition = positions.get(i).add(newVelocity);
      positions.set(i, newPosition);
      if (toRemove.containsKey(newPosition)) {
        toRemove.get(newPosition).add(i);
      } else {
        List<Integer> list = new ArrayList<Integer>();
        list.add(i);
        toRemove.put(newPosition, list);
      }
    }
    return toRemove;
  }

  private static int closestParticleIndex(List<String> inputFile, List<Triplet> positions, List<Triplet> velocities,
      List<Triplet> accelerations) {
    List<Integer> norms = new ArrayList<Integer>();
    for (String s : inputFile) {
      String[] elements = s.split(", ");
      String position = elements[0].substring(3, elements[0].length() - 1);
      String velocity = elements[1].substring(3, elements[1].length() - 1);
      String acceleration = elements[2].substring(3, elements[2].length() - 1);
      Triplet pos = Triplet.of(position.split(","));
      Triplet vel = Triplet.of(velocity.split(","));
      Triplet acc = Triplet.of(acceleration.split(","));
      positions.add(pos);
      velocities.add(vel);
      accelerations.add(acc);
      int norm = acc.norm();
      norms.add(norm);
    }
    return min(norms)[1];
  }
}
