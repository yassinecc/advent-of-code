package advent16;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Day12 extends tools{

	private static void Run(List<String> inFile, Map<String,Integer> map, int i) {
		scan: while(i>=0 && i<inFile.size()){
			String comm = inFile.get(i);
			String[] elements = comm.split(" ");
			String inst = elements[0];

			if(inst.equals("cpy")){
				String register0 = elements[2];
				int newValue0 = tools.isInteger(elements[1]) ? Integer.valueOf(elements[1]) : map.get(elements[1]); 
				map.put(register0, newValue0);
			}

			else if(inst.equals("inc")){
				String register1 = elements[1];
				int newValue1 = map.get(register1) + 1;
				map.put(register1, newValue1);
			}

			else if(inst.equals("dec")){
				String register2 = elements[1];
				int newValue2 = map.get(register2) - 1;
				map.put(register2, newValue2);
			}

			else if(inst.equals("jnz")){
				String register3 = elements[1];

				if(i>1){
					boolean inc = inFile.get(i-2).split(" ")[0].equals("inc");
					boolean dec = inFile.get(i-1).split(" ")[0].equals("dec");
					boolean same = inFile.get(i-1).split(" ")[1].equals(register3);

					if(inc && dec && same){
						String superReg = inFile.get(i-2).split(" ")[1];
						String countReg = inFile.get(i-1).split(" ")[1];
						int newAvalue =  map.get(superReg) + map.get(countReg);
						map.put(superReg, newAvalue);
						map.put(countReg, 0);
						i++;
						continue scan;
					}
				}
				int testValue = tools.isInteger(register3) ? Integer.valueOf(register3) : map.get(register3);

				if(testValue!=0){
					i += Integer.valueOf(elements[2]);
					continue scan;
				}
			}
			i++;
		}
	}

	public static void main(String[] args) {
		List<String> inFile = readFile("input12.txt");

		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("a", 0);
		map.put("b", 0);
		map.put("c", 0);
		map.put("d", 0);
		
		Map<String, Integer> map2 = new HashMap<String, Integer>(map);
		map.put("c", 1);
		
		Run(inFile, map, 0);

		println("Part 1: register 'a' has value " + map.get("a"));
		
		Run(inFile, map2, 0);
		
		println("Part 2: register 'a' has value " + map2.get("a"));

	}

}
