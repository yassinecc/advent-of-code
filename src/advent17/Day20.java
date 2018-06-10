package advent17;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Day20 extends tools {
  public static void main(String[] args) {
    List<String> inputFile = readFile("input20.txt");
    List<Triplet> positions = new ArrayList<Triplet>();
    List<Triplet> velocities = new ArrayList<Triplet>();
    List<Triplet> accelerations = new ArrayList<Triplet>();
    List<Integer> norms = initialiseAndComputeNorms(inputFile, positions, velocities, accelerations);

    println("Closest particle to origin: " + min(norms)[1]);

    int i = 0;
    while (i < 100) {
      updateValues(positions, velocities, accelerations);
      removeDuplicates(findDuplicates(positions), positions, velocities, accelerations);
      i++;
    }
    println("Particles left after collisions" + positions.size());
  }

  private static void updateValues(List<Triplet> positions, List<Triplet> velocities, List<Triplet> accelerations) {
    for (int i = 0; i < positions.size(); i++) {
      velocities.set(i, velocities.get(i).add(accelerations.get(i)));
      positions.set(i, positions.get(i).add(velocities.get(i)));
    }
  }

  private static Set<Triplet> findDuplicates(List<Triplet> positions) {
    Set<Triplet> collisionPositions = new HashSet<Triplet>();
    for (Triplet currentParticle : positions) {
      if (positions.indexOf(currentParticle) != positions.lastIndexOf(currentParticle)) {
        collisionPositions.add(currentParticle);
      }
    }
    return collisionPositions;
  }

  private static void removeDuplicates(Set<Triplet> collisionPositions, List<Triplet> positions,
      List<Triplet> velocities, List<Triplet> accelerations) {

    List<Triplet> newPositions = new ArrayList<Triplet>();
    List<Triplet> newVelocities = new ArrayList<Triplet>();
    List<Triplet> newAccelerations = new ArrayList<Triplet>();

    for (int i = 0; i < positions.size(); i++) {
      if (!collisionPositions.contains(positions.get(i))) {
        newPositions.add(positions.get(i));
        newVelocities.add(velocities.get(i));
        newAccelerations.add(accelerations.get(i));
      }
    }
    positions.removeAll(positions);
    positions.addAll(newPositions);
    velocities.removeAll(velocities);
    velocities.addAll(newVelocities);
    accelerations.removeAll(accelerations);
    accelerations.addAll(newAccelerations);
  }

  private static List<Integer> initialiseAndComputeNorms(List<String> inputFile, List<Triplet> positions,
      List<Triplet> velocities, List<Triplet> accelerations) {
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
    return norms;
  }
}
