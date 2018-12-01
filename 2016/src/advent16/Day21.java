package advent16;

import java.util.List;

public class Day21 extends tools {

	public static String swapPositions(String s, int x, int y){
		char[] sArray = s.toCharArray();
		char temp = sArray[y];
		sArray[y] = sArray[x];
		sArray[x] = temp;
		return new String(sArray);
	}

	public static String swapLetters(String s, char x, char y){
		String temp = s.replace(x, '?');
		temp = temp.replace(y, x);
		temp = temp.replace('?', y);
		return temp;
	}

	public static String rotateLeft(String s, int steps){
		String result;
		if(steps<0) {
			result =  rotateRight(s, -steps);
		}
		else {
			steps = steps % s.length();
			String firstPart = s.substring(steps);
			String secondPart = s.substring(0, steps);
			result = firstPart + secondPart;
		}
		return result;
	}

	public static String invert_rotateLeft(String s, int steps){
		return rotateRight(s, steps);
	}

	public static String rotateRight(String s, int steps){
		String result;
		if(steps<0) {
			result = rotateLeft(s, -steps);
		}
		else {
			steps = steps % s.length();
			int complementaryInt = s.length() - steps;
			result = rotateLeft(s, complementaryInt);
		}
		return result;
	}

	public static String invert_rotateRight(String s, int steps){
		return rotateLeft(s, steps);
	}

	public static String rotateBasedOnPosition(String s, char ch){
		int indexOfBase = s.indexOf(ch);
		indexOfBase+= indexOfBase>=4 ? 1 : 0;
		String result = rotateRight(s, indexOfBase+1);
		return result;
	}

	public static String invert_rotateBasedOnPosition(String s, char ch){
		int indexOfBase = s.indexOf(ch);
		String result;
		if(indexOfBase%2==1) {
			int oldIndex = (indexOfBase - 1)/2;
			result = rotateLeft(s, indexOfBase - oldIndex);
		}
		else {
			indexOfBase = indexOfBase==0 ? 8 : indexOfBase;
			int oldIndex = indexOfBase + 3 - indexOfBase/2;
			result = rotateRight(s, oldIndex - indexOfBase);
		}
		return result;
	}

	public static String reverse(String s, int left, int right){
		String firstPart = s.substring(0, left);
		String secondPartBefore = s.substring(left, right+1);
		String secondPart = new StringBuilder(secondPartBefore).reverse().toString();
		String thirdPart = s.substring(right+1);
		String result = firstPart + secondPart + thirdPart;
		return result;
	}

	public static String move(String s, int start, int end){
		String toMove = s.substring(start, start + 1);
		s = s.replace(toMove, "");
		String firstPart = s.substring(0, end);
		String secondPart = s.substring(end);
		String result = firstPart + toMove + secondPart;
		return result;
	}

	public static String invert_move(String s, int end, int start){
		String toMove = s.substring(start, start + 1);
		s = s.replace(toMove, "");
		String firstPart = s.substring(0, end);
		String secondPart = s.substring(end);
		String result = firstPart + toMove + secondPart;
		return result;
	}

	public static void main(String[] args) {
		List<String> input = readFile("input21.txt");
		String s = "abcdefgh";

		for(String el:input) {
			String[] splitted = el.split(" ");
			String firstWord = splitted[0];

			switch(firstWord) {
			case "swap" : {
				String secondWord = splitted[1];
				if(secondWord.equals("position")) {
					int x = Integer.parseInt(splitted[2]);
					int y = Integer.parseInt(splitted[5]);
					s = swapPositions(s, x, y);
				}
				else {
					char x = splitted[2].charAt(0);
					char y = splitted[5].charAt(0);
					s = swapLetters(s, x, y);
				}
				break;
			}
			case "rotate" : {
				String secondWord = splitted[1];
				switch(secondWord) {
				case "based" : {
					char ch = splitted[6].charAt(0);
					s = rotateBasedOnPosition(s, ch);
					break;
				}
				case "left" : {
					int steps = Integer.parseInt(splitted[2]);
					s = rotateLeft(s, steps);
					break;
				}
				case "right" : {
					int steps = Integer.parseInt(splitted[2]);
					s = rotateRight(s, steps);
					break;
				}
				}
				break;
			}
			case "reverse" : {
				int left = Integer.parseInt(splitted[2]);
				int right = Integer.parseInt(splitted[4]);
				s = reverse(s, left, right);
				break;
			}
			case "move" : {
				int start = Integer.parseInt(splitted[2]);
				int end = Integer.parseInt(splitted[5]);
				s = move(s, start, end);
				break;
			}
			}
		}
		println("Scambled password is " + s);
		
		s = "fbgdceah";

		for(int i=input.size() - 1; i>=0; i--){
			String[] splitted = input.get(i).split(" ");
			String firstWord = splitted[0];

			switch(firstWord) {
			case "swap" : {
				String secondWord = splitted[1];
				if(secondWord.equals("position")) {
					int x = Integer.parseInt(splitted[2]);
					int y = Integer.parseInt(splitted[5]);
					s = swapPositions(s, x, y);
				}
				else {
					char x = splitted[2].charAt(0);
					char y = splitted[5].charAt(0);
					s = swapLetters(s, x, y);
				}
				break;
			}
			case "rotate" : {
				String secondWord = splitted[1];
				switch(secondWord) {
				case "based" : {
					char ch = splitted[6].charAt(0);
					s = invert_rotateBasedOnPosition(s, ch);
					break;
				}
				case "left" : {
					int steps = Integer.parseInt(splitted[2]);
					s = invert_rotateLeft(s, steps);
					break;
				}
				case "right" : {
					int steps = Integer.parseInt(splitted[2]);
					s = invert_rotateRight(s, steps);
					break;
				}
				}
				break;
			}
			case "reverse" : {
				int left = Integer.parseInt(splitted[2]);
				int right = Integer.parseInt(splitted[4]);
				s = reverse(s, left, right);
				break;
			}
			case "move" : {
				int start = Integer.parseInt(splitted[2]);
				int end = Integer.parseInt(splitted[5]);
				s = invert_move(s, start, end);
				break;
			}
			}
		}
		println("Unscrambled password is " + s);
	}

}
