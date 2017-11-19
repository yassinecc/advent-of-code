package advent16;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Day23 extends tools{

	private static void Run(List<String> inFile, Map<String,Integer> map, int i) {
		while(i>=0 && i<inFile.size()){
			String comm = inFile.get(i);
			println(comm);
			String[] elements = comm.split(" ");
			String inst = elements[0];

			if(inst.equals("tgl")) {
				int position = tools.isInteger(elements[1]) ? Integer.parseInt(elements[1]) : map.get(elements[1]); 
				if(i + position>=0 && i + position<inFile.size()) {
					String toToggle = inFile.get(i + position);
					String[] elts = toToggle.split(" ");
					String oldInst = elts[0];
					String newInst = oldInst;

					if(elts.length==2) { // one-argument instruction
						newInst = oldInst.equals("inc") ? "dec" : "inc";
					}
					else if(elts.length==3) { // two-argument instruction
						newInst = oldInst.equals("jnz") ? "cpy" : "jnz";
					}
					String newToggled = toToggle.replace(oldInst, newInst);
					inFile.set(i + position, newToggled);
				}
			}

			if(inst.equals("cpy")){
				String register0 = elements[2];
				if(!tools.isInteger(register0)) {
					int newValue0 = tools.isInteger(elements[1]) ? Integer.parseInt(elements[1]) : map.get(elements[1]); 
					map.put(register0, newValue0);
				}
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
				//				println(map.get("d"));
				String register3 = elements[1];
				if(i<inFile.size() - 2){
					String[] inOneStep = inFile.get(i+1).split(" ");
					String[] inTwoSteps = inFile.get(i+2).split(" ");
					String[] threeStepsAgo = inFile.get(i-3).split(" ");

					// Big optimisation
					if(threeStepsAgo[0].equals("cpy") && inOneStep[0].equals("dec") && inTwoSteps[0].equals("jnz") && inOneStep[1].equals(inTwoSteps[1])) {
						String targetRegister = inFile.get(i-2).split(" ")[1];
						String mult1 = inFile.get(i-3).split(" ")[1];
						String mult2 = inFile.get(i+1).split(" ")[1]; // to set to 0
						String toZero = inFile.get(i-1).split(" ")[1];
						map.put(targetRegister, map.get(mult1)*map.get(mult2));
						map.put(mult2, 0);
						map.put(toZero, 0);
						i += 3;
					}

					else { // Small optimisation
						String registerOne = inFile.get(i-2).split(" ")[0];
						String registerTwo = inFile.get(i-1).split(" ")[0];
						Map<String, String> loopMap = new HashMap<String, String>();

						loopMap.put(registerOne, inFile.get(i-2).split(" ")[1]);
						loopMap.put(registerTwo, inFile.get(i-1).split(" ")[1]);


						boolean incAndDec = loopMap.containsKey("inc") && loopMap.containsKey("dec");
						boolean same = incAndDec && loopMap.get("dec").equals(register3);

						if(same){
							String superReg = loopMap.get("inc");
							String countReg = loopMap.get("dec");
							int newAvalue =  map.get(superReg) + map.get(countReg);
							map.put(superReg, newAvalue);
							map.put(countReg, 0);
							i++;
							continue;
						}
					}
				}
				int testValue = tools.isInteger(register3) ? Integer.valueOf(register3) : map.get(register3);

				if(testValue!=0){
					int increment = tools.isInteger(elements[2]) ? Integer.parseInt(elements[2]) : map.get(elements[2]);
					i += increment;
					continue;
				}
			}
			i++;
		}
	}

	public static void main(String[] args) {
		List<String> inFile1 = readFile("input23.txt");
		List<String> inFile2 = readFile("input23.txt");

		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("a", 7);
		map.put("b", 0);
		map.put("c", 0);
		map.put("d", 0);

		Map<String, Integer> map2 = new HashMap<String, Integer>(map);
		map2.put("a", 12);

		Run(inFile1, map, 0);

		println("Part 1: register 'a' has value " + map.get("a"));

		//		Run(inFile2, map2, 0);
		//
		//		println("Part 2: register 'a' has value " + map2.get("a"));

	}

}
