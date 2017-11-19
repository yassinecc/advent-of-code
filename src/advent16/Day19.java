package advent16;

public class Day19 extends tools{

	private static int[] newListA(int[] myList){
		int sz = myList.length;
		int[] newList = new int[sz/2];

		if(sz%2==0){
			for(int j=0; j<sz/2; j++){
				newList[j] = myList[2*j];
			}
		}

		else{
			for(int j=0; j<sz/2 - 1; j++){
				newList[j] = myList[2*j+ 2];
			}
			newList[sz/2 - 1] = myList[sz - 1];
		}
		return newList;
	}

	private static int[] newListB(int[] myList){
		int sz = myList.length;

		if(sz%2==0){
			int numSwaps = ((sz/2)/3)*2 + (sz/2)%3;
			int[] newList = new int[sz - numSwaps];
			int firstCopy = sz/2 - numSwaps; // How many elements before the middle did not play
			System.arraycopy(myList, numSwaps, newList, 0, firstCopy);

			int i = firstCopy;
			int j = sz/2 + 2;
			while(j<sz){
				newList[i] = myList[j];
				i++;
				j+=3;
			}
			System.arraycopy(myList, 0, newList, i, numSwaps);
			return newList;
		}
		else{
			int numSwaps = sz/3 + (sz%3==1 ? 1 : 0);
			int[] newList = new int[sz- numSwaps];
			int firstCopy = sz/2 - numSwaps;
			System.arraycopy(myList, numSwaps, newList, 0, firstCopy);


			int i = firstCopy;
			int j = sz/2 + 1;
			while(j<sz){
				newList[i] = myList[j];
				i++;
				j+=3;
			}
			System.arraycopy(myList, 0, newList, i, firstCopy);
			return newList;
		}
	}

	public static void main(String[] args) {
		int numElves = 3014603;
		int[] elvesListA = new int[numElves];
		for(int i=0; i<numElves; i++){
			elvesListA[i] = i+1;
		}
		int[] elvesListB = elvesListA;
		while(elvesListA.length>1){
			elvesListA = newListA(elvesListA);
		}
		
		while(elvesListB.length>1){
			elvesListB = newListB(elvesListB);
		}
		println("Elf " + elvesListA[0] + " gets alls presents in part 1");
		println("Elf " + elvesListB[0] + " gets alls presents in part 2");
	}

}
