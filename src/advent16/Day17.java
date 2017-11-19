package advent16;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Set;

public class Day17 extends tools {

	private static class Room {
		private final int x;
		private final int y;
		private final String path;

		private Room(int _x, int _y, String code){
			this.x = _x;
			this.y = _y;
			this.path = code;
		}

		private Room(Room parent, char direction) {

			switch(direction){
			case 'U' : {
				this.x = parent.x;
				this.y = parent.y - 1;
				break;
			}
			case 'D' : {
				this.x = parent.x;
				this.y = parent.y + 1;
				break;
			}
			case 'L' : {
				this.x = parent.x - 1;
				this.y = parent.y;
				break;
			}
			case 'R' : {
				this.x = parent.x + 1;
				this.y = parent.y;
				break;
			}
			default : {
				this.x = parent.x;
				this.y = parent.y;
				break;
			}
			}
			this.path = parent.path + direction;
			if(!this.isInside()){
				println("Room outside boundaries");
			}
		}

		private boolean isInside() {
			boolean validX = this.x > -1 && this.x < 4;
			boolean validY = this.y > -1 && this.y < 4;
			return validX && validY;
		}

		private boolean isInside(char direction) { // Direction can be "U", "D" etc.
			switch(direction){
			case 'U' : {
				return this.y>0;
			}
			case 'D' : {
				return this.y<3;
			}
			case 'L' : {
				return this.x>0;
			}
			case 'R' : {
				return this.x<3;
			}
			default : {
				return false;
			}
			}
		}

		private Set<Room> nextMoves() throws Exception {
			Set<Room> newSet = new HashSet<Room>();
			String hash = getMD5Hex(this.path).substring(0, 4);
			String directions = "UDLR";

			for(int i=0; i<4; i++) {
				char direction = directions.charAt(i);
				if(this.isInside(direction) && hash.charAt(i)>'a'){
					
					Room newRoom = new Room(this, direction);
					newSet.add(newRoom);
				}
			}
			return newSet;
		}
	}

	public static void main(String[] args) throws Exception { 

		String input= "ihgpwlah";
		input = "vkjiggvb";
		Room start = new Room(0, 0, input);
		
		Queue<Room> queue = new LinkedList<Room>();
		queue.add(start);
		String longPath = input;
		String shortPath = "";
		
		while(!queue.isEmpty()){
			Room curRoom = queue.poll();
			
			if(curRoom.x==3 && curRoom.y==3) {
				if(shortPath.isEmpty()){
					shortPath = curRoom.path;
				}
				if(curRoom.path.length()>longPath.length()){
					longPath = curRoom.path;
				}
				continue;
			}
			Set<Room> toAdd = curRoom.nextMoves();
			queue.addAll(toAdd);
		}
		println("Shortest path to vault is " + shortPath.substring(input.length()));
		println("Longest path to vault has length "+ (longPath.length() - input.length()));
	}
}
