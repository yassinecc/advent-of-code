package advent16;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Set;

public class Day11 extends tools{


	private static class State{
		private final int curFloor;
		private final List<List<String>> floors;
		private int depth;

		//constructor
		public State(int curFloor){
			this.curFloor = curFloor;
			this.floors = new ArrayList<List<String>>();
		}

		public State(int curFloor, List<List<String>> floors){
			this.curFloor = curFloor;
			this.floors = floors;
		}

		@SuppressWarnings("unused")
		public State(int curFloor, List<String> first, List<String> second, List<String> third, List<String> fourth){
			this.curFloor = curFloor;
			this.floors = new ArrayList<List<String>>();
			this.floors.add(first);
			this.floors.add(second);
			this.floors.add(third);
			this.floors.add(fourth);
		}

		public boolean isValid(){			
			boolean result = true;

			search: for(List<String> floor:this.floors) { // check on each floor
				String regexGen = "[a-z]g";
				String regexChip = "[a-z]m";
				List<String> gens = match(floor, regexGen);
				List<String> chips = match(floor, regexChip);
				if(gens.size()>0){	
					for(String chip:chips){
						String Shield = chip.charAt(0)+"g";						
						if(!gens.contains(Shield)){
							result = false;
							break search;
						}
					}
				}
			}
			return result;
		}

		public String equivalent(){
			String result = Integer.toString(this.curFloor);
			for(List<String> floor:this.floors){
				int numGen = 0;
				int numChips = 0;
				for(String el:floor){
					if(el.charAt(1)=='g'){
						numGen++;
					}
					else{
						numChips++;
					}
				}
				result = result + "x" + Integer.toString(numGen) + "x" + Integer.toString(numChips);
			}
			return result;
		}

		public List<State> nextMoves(Set<String> Visited){
			List<State> result = new ArrayList<State>();
			List<String> curFloor = this.floors.get(this.curFloor);
			List<List<String>> allPairs = findPerms(curFloor);
			for(List<String> el:allPairs){
				if(this.curFloor<3){
					State sUp = this.move(el, "up");
					if(sUp.isValid() && !Visited.contains(sUp.equivalent())){
						result.add(sUp);
					}
				}
				if(this.curFloor>0){
					State sDown = this.move(el, "down");
					if(sDown.isValid() && !Visited.contains(sDown.equivalent())){
						result.add(sDown);
					}
				}
			}
			return result;
		}

		public State move(List<String> elts, String direction){
			int dir = direction.equals("up") ? 1 : -1;
			int floor = this.curFloor;
			List<List<String>> floors = new ArrayList<List<String>>(this.floors);
			State result = new State(floor+dir, floors);
			List<String> oldFloor = new ArrayList<String>(result.floors.get(floor));
			List<String> newFloor = new ArrayList<String>(result.floors.get(floor + dir));
			oldFloor.removeAll(elts);
			newFloor.addAll(elts);
			result.floors.set(floor, oldFloor);
			result.floors.set(floor+dir, newFloor);
			return result;
		}

		@SuppressWarnings("unused")
		public void display(){
			println("Current floor is "+ this.curFloor);
			int i = 0;
			for(List<String> floor:this.floors){
				print("Floor "+ i+" has ");
				println(floor);
				i++;
			}
		}
	}

	public static void process(String fileName){
		State state_= new State(0);

		List<String> inFile = readFile(fileName);
		int totalElts = 0;
		for(String el:inFile){
			el = el.replace(",", "");
			el = el.replace("and ", "");
			el = el.replace(".", "");
			el = el.replaceAll("-compatible", "");
			String[] splitted = el.split(" +a +");
			ArrayList<String> floorArray = new ArrayList<String>();

			for(int i=1; i<splitted.length; i++){
				String part = splitted[i];
				String acronym = "";
				acronym+=part.split(" ")[0].charAt(0);
				acronym+=part.split(" ")[1].charAt(0);
				floorArray.add(acronym);
				totalElts++;
			}

			state_.floors.add(floorArray);

		}

//		ss.display();
		state_.depth = 0;
		Set<String> Visited = new HashSet<String>();
		Queue<State> Queue = new LinkedList<State>();


		Visited.add(state_.equivalent());
		Queue.add(state_);
		
		while(!Queue.isEmpty()){
			State currentState = Queue.poll();
			
			if(currentState.floors.get(3).size()==totalElts){
				println(currentState.depth);
//				currentState.display();
				break;
			}
			List<State> moves = currentState.nextMoves(Visited);
			
			for(State el:moves){
				
				if(!Visited.contains(el.equivalent())){
					Visited.add(el.equivalent());
					el.depth = currentState.depth + 1;
					Queue.add(el);
				}
			}
		}
	}
	
	public static void main(String[] args) {
		print("Minimum number of steps, part 1: ");
		process("input11.txt");
		print("Minimum number of steps, part 2: ");
		process("input11b.txt");
	}

}
