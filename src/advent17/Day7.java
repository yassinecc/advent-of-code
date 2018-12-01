package advent17;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Day7 extends tools {

  private static String fillTree(List<String> inputFile, Map<String, Node> nodeMap) {
    List<String> candidates = new ArrayList<String>();
    String leaf = "";
    for (String s: inputFile) {
      String name = s.split(" ")[0];
      int weight = Integer.parseInt(s.split("\\(|\\)")[1]);
      Node parentNode;
      if(nodeMap.containsKey(name)) {
        parentNode = nodeMap.get(name);
        parentNode.weight = weight;
      }
      else {
        parentNode = new Node(name, weight);
        nodeMap.put(name, parentNode);
      }

      if (s.indexOf('>') > 0) {
        candidates.add(s.split(" ")[0]);
        String[] children = s.split("-> ")[1].split(", ");
        List<Node> childrenList = new ArrayList<Node>();
        for(int i=0; i<children.length; i++) {
          if(candidates.contains(children[i])) candidates.remove(children[i]);
          if(nodeMap.containsKey(children[i])) childrenList.add(nodeMap.get(children[i]));
          else {
            Node newNode = new Node(children[i], 0);
            nodeMap.put(children[i], newNode);
            childrenList.add(newNode);
          }
        }
        Node.connect(parentNode, childrenList);
        leaf = parentNode.name;
      }
    }
    return leaf;
  }

  public static void main(String[] args) {
    List<String> inputFile = readFile("input7.txt");
    Map<String, Node> nodeMap = new HashMap<String, Node>();
    String leaf = fillTree(inputFile, nodeMap);
    Node tower = nodeMap.get(leaf);
    while (tower.parent != null) {
      tower = tower.parent;
    }
    println("Parent is " + tower.name);

    loop: while(true) {
      Map<Integer, String> childrenWeights = new HashMap<Integer,String>();
      Integer newWeight = 0;
      for(Node child: tower.children) {
        newWeight = child.discWeight();
        if(childrenWeights.keySet().size()>1 && childrenWeights.containsKey(newWeight)) {
          Integer faultyWeight = childrenWeights.keySet().stream().mapToInt(Integer::intValue).sum() - newWeight;
          tower = nodeMap.get(childrenWeights.get(faultyWeight));
          continue loop;
       }
        else childrenWeights.put(child.discWeight(), child.name);
      }
      if (childrenWeights.keySet().size() == 1) {
        Node brother = tower.parent.children.get(0);
        int idealWeight  = brother.name != tower.name ? brother.discWeight() : tower.parent.children.get(1).discWeight();
        println(tower.name + " is the culprit and should have weight " + (tower.weight + idealWeight - tower.discWeight()));
        break loop;
      }
      else {
        tower = nodeMap.get(childrenWeights.get(newWeight));
        continue loop;
      }
    }
  }
}
