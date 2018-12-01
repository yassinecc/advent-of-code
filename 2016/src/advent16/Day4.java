package advent16;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

public class Day4 extends tools{

	private static String cipher(String input, int ID){
		ID = ID%26; // 26 rotations don't change a character
		StringBuilder in = new StringBuilder(input); // To change characters

		for(int i=0; i<in.length(); i++){
			char curChar = in.charAt(i);

			if(curChar!=' '){
				int newInt = 'a' + (curChar - 'a' + ID)%26; // Remainder to wrap around
				char newChar = (char) newInt;
				in.setCharAt(i, newChar);
			}
		}
		return in.toString();
	}

	public static void main(String[] args){
		ArrayList<String> input = readFile("input4.txt");
		int sum = 0;

		for(String text:input){
			// String test = "not-a-real-room-404[oarel]"; // Test case
			String[] name = text.split("-(?=[0-9])"); // Separating name from ID and checksum
			String nodash = name[0].replaceAll("-", ""); // Removing dashes
			char[] charray = nodash.toCharArray();
			String cksum = name[1].substring(name[1].length()-6, name[1].length()-1);
			int ID = Integer.parseInt(name[1].substring(0, name[1].length()-7));
			Arrays.sort(charray); // Grouping same letters together

			// Convert room name to numbers containing the occurrences of a given character (integer part) and and encoding for the character
			// itself (fractional part)
			char chr = charray[0];
			int ctr = 1;
			ArrayList<Double> list = new ArrayList<Double>();

			for(int i=1; i<charray.length; i++){ // Looping through letter-sorted name
				if(charray[i]==chr){ // increase letter counter if letter is the same as previous
					ctr++;
				}
				else{
					double frac = 1 / (chr - 'a' + 2.0); // fractional representation of number, frac decreases with alphabetical order
					list.add(ctr+frac); // Store occurrences of encoded character in list
					chr = charray[i];
					ctr = 1;
				}
			}
			double frac = 1/ (chr - 'a' + 2.0);
			list.add(ctr+frac); // edge chain
			Collections.sort(list); // Sort letters according to their occurrences (integer part) and, if they are tied, by alphabetical order
			Collections.reverse(list); // Reverse to get letters with more occurrences first
			StringBuilder common = new StringBuilder();

			for(int i=0; i<5; i++){
				double el = list.get(i);
		 		double frac_ = el % 1; // get back fractional part
				common.append(Character.toString((char) (Math.round(1/frac_) - 2 + 'a')));
			}
			if(common.toString().equals(cksum)){
				String spaced = name[0].replaceAll("-", " ");
				sum+= ID;
				String ciphered = cipher(spaced, ID);
				if(ciphered.contains("north")){
					println(ciphered + " has sector ID " + ID);
				}
			}
		}
		println(sum);
	}
}
