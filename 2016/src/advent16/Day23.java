package advent16;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Day23 extends tools{

	private static void increment(Map<String,Integer> map, String[] elements, int inc) {
		String register = elements[1];
		int newValue = map.get(register) + inc;
		map.put(register, newValue);
 }

 private static void copy(Map<String,Integer> map, String[] elements) {
	String register = elements[2];
	if(!tools.isInteger(register)) {
		int newValue = tools.isInteger(elements[1]) ? Integer.parseInt(elements[1]) : map.get(elements[1]); 
		map.put(register, newValue);
	}
 }

 private static void toggle(List<String> inputFile, int i, Map<String,Integer> map, String[] elements) {
				int position = tools.isInteger(elements[1]) ? Integer.parseInt(elements[1]) : map.get(elements[1]); 
		if(i + position>=0 && i + position<inputFile.size()) {
			String toToggle = inputFile.get(i + position);
			String[] toToggleElements = toToggle.split(" ");
			String oldInstruction = toToggleElements[0];
			String newInstruction = oldInstruction;

		if(toToggleElements.length==2) { // one-argument instruction
			newInstruction = oldInstruction.equals("inc") ? "dec" : "inc";
					}
		else if(toToggleElements.length==3) { // two-argument instruction
			newInstruction = oldInstruction.equals("jnz") ? "cpy" : "jnz";
					}
		String newToggled = toToggle.replace(oldInstruction, newInstruction);
		inputFile.set(i + position, newToggled);
				}
			}

	private static void Run(List<String> inputFile, Map<String,Integer> map, int i) {
		while(i>=0 && i<inputFile.size()){
			String line = inputFile.get(i);
			String[] elements = line.split(" ");
			String instruction = elements[0];

			if(instruction.equals("tgl")) {
				toggle(inputFile, i, map, elements);
				}

			if(instruction.equals("cpy")){
				copy(map, elements);
			}

			else if(instruction.equals("inc")){
				increment(map, elements, 1);
			}

			else if(instruction.equals("dec")){
				increment(map, elements, -1);
			}

			else if(instruction.equals("jnz")){
				String register = elements[1];
				if(i<inputFile.size() - 2){
					String[] inOneStep = inputFile.get(i+1).split(" ");
					String[] inTwoSteps = inputFile.get(i+2).split(" ");
					String[] threeStepsAgo = inputFile.get(i-3).split(" ");

					// Big optimisation
					if(threeStepsAgo[0].equals("cpy") && inOneStep[0].equals("dec") && inTwoSteps[0].equals("jnz") && inOneStep[1].equals(inTwoSteps[1])) {
						String targetRegister = inputFile.get(i-2).split(" ")[1];
						String mult1 = threeStepsAgo[1];
						String mult2 = inOneStep[1]; // to set to 0
						String toZero = inputFile.get(i-1).split(" ")[1];
						int mult1Value = tools.isInteger(mult1) ? Integer.valueOf(mult1) : map.get(mult1);
						map.put(targetRegister, (map.get(targetRegister)-1)+(mult1Value+0)*map.get(mult2));
						map.put(mult2, 0);
						map.put(toZero, 0);
						i += 3;
						continue;
					}

					else { // Small optimisation
						String registerOne = inputFile.get(i-2).split(" ")[0];
						String registerTwo = inputFile.get(i-1).split(" ")[0];
						Map<String, String> loopMap = new HashMap<String, String>();

						loopMap.put(registerOne, inputFile.get(i-2).split(" ")[1]);
						loopMap.put(registerTwo, inputFile.get(i-1).split(" ")[1]);


						boolean incAndDec = loopMap.containsKey("inc") && loopMap.containsKey("dec");
						boolean same = incAndDec && loopMap.get("dec").equals(register);

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
				int testValue = tools.isInteger(register) ? Integer.valueOf(register) : map.get(register);

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

		Run(inFile2, map2, 0);
		
		println("Part 2: register 'a' has value " + map2.get("a"));

	}

}
