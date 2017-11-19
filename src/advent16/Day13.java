package advent16;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Set;

public class Day13 extends tools{

	private static class Cubicle{
		private final int x;
		private final int y;
		private final int input;
		private int depth;

		private Cubicle(int x_ , int y_, int input_){
			this.x = x_;
			this.y = y_;
			this.input = input_;
		}

		private Cubicle(Cubicle parent_, int h, int v){
			this.x = parent_.x + h;
			this.y = parent_.y + v;
			this.input = parent_.input;
			this.depth = parent_.depth + 1;
		}

		private final boolean isOpen(int h, int v){
			int x_ = x+h;
			int y_ = y+v;
			int number = x_*x_ + 3*x_ + 2*x_*y_ +y_ + y_*y_;
			number+= this.input;
			int count = Integer.bitCount(number);
			return(count%2==0);
		}

		private final Set<Cubicle> moves(Set<String> Visited){
			Set<Cubicle> result = new HashSet<Cubicle>();
			// either h=+-1 and v=0 or h=0 and v=+-1
			for(int v = -1; v<=1; v++){
				for(int h = -1; h<=1; h++){
					if(h+v!=0 && h*v==0 && x+h>=0 && y+v>=0){ // Not outside edges
						if(this.isOpen(h,v)){
							Cubicle newMove = new Cubicle(this, h, v);
							if(!Visited.contains(newMove.pos())){
								result.add(newMove);
							}

						}
					}
				}
			}
			return result;
		}

		private final void display(Set<String> Visited){
			String result = this.isOpen(0,0) ? "." : "#";
			result = Visited.contains(this.pos()) ? "o" : result;
			print(result);
		}

		private final String pos(){
			String result = "";
			result+= this.x + " " + this.y;
			return result;
		}

		@SuppressWarnings("unused")
		private final static void showGrid(int X, int Y, int input, Set<String> Visited){
			String xAxis = "  ";
			for(int i=0; i<X; i++){
				xAxis+= Integer.toString(i);
			}
			println(xAxis);

			for(int j=0; j<Y; j++){
				print(Integer.toString(j) + " ");
				for(int i=0; i<X; i++){
					Cubicle cub = new Cubicle(i, j, input);
					cub.display(Visited);
				}
				println("");
			}
		}
	}

	public static void main(String[] args){
		int input = 1364;
		@SuppressWarnings("unused")
		int testInput = 10;
		int in = input;
		Cubicle cub = new Cubicle(1,1,in);
		Set<String> Visited = new HashSet<String>();
		Queue<Cubicle> Queue = new LinkedList<Cubicle>();
		Queue.add(cub);
		int count = 0;
		
		while(!Queue.isEmpty()){
			Cubicle currentCub = Queue.poll();
			if(currentCub.x == 31 && currentCub.y == 39){
				println("Path to goal has length of " + currentCub.depth);
				break;
			}

			if(!Visited.contains(currentCub.pos())){
				Visited.add(currentCub.pos());
				if(currentCub.depth<=50){
					count++;
				}
				Set<Cubicle> moves_ = currentCub.moves(Visited);

				for(Cubicle cub_:moves_){
					if(!Queue.contains(cub_)){
						Queue.add(cub_);
					}
				}
			}
		}
		//		Cubicle.showGrid(40, 40, in, Visited);
		println(count + " points are reached in under 50 iterations.");
	}

}
