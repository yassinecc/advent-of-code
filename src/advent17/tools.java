package advent17;

import java.io.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class tools {
	public static ArrayList<String> readFile(String fileName) {
		// Reads a text file line by line. Each line is stored as an ArrayList string element
		File file = new File(fileName);
		ArrayList<String> input = new ArrayList<String>();
		try {
			BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));

			String line;
			while ((line = br.readLine()) != null) {
				input.add(line);
			}
			br.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return input;
	}

	public static int[] max(List<Integer> intArray) {
		if(intArray.size()<1) return new int[] {0, -1};
		int candidate = intArray.get(0);
		int candidateIndex = 0;
		for (int i=1; i<intArray.size(); i++) {
			if( candidate < intArray.get(i)) {
				candidate = intArray.get(i);
				candidateIndex = i;
			};
		}
		return new int[] {candidate, candidateIndex};
	}

	public static int[] min(List<Integer> intArray) {
		if(intArray.size()<1) return new int[] {0, -1};
		int candidate = intArray.get(0);
		int candidateIndex = 0;
		for (int i=1; i<intArray.size(); i++) {
			if( candidate > intArray.get(i)) {
				candidate = intArray.get(i);
				candidateIndex = i;
			};
		}
		return new int[] {candidate, candidateIndex};
	}

	public static int[] findAll(String input, char chr) {
		ArrayList<Integer> list = new ArrayList<Integer>();
		int index = input.indexOf(chr);
		while (index >= 0) {
			list.add(index);
			index = input.indexOf(chr, index + 1);
		}
		return list.stream().mapToInt(i -> i).toArray();
	}

	public static void println(Object a) {
		System.out.println(a);
	}

	public static void print(Object a) {
		System.out.print(a);
	}

	public static String getMD5Hex(final String inputString) throws NoSuchAlgorithmException {
		// From http://www.twmacinta.com/myjava/fast_md5.php
		MessageDigest md = MessageDigest.getInstance("MD5");
		md.update(inputString.getBytes());

		byte[] digest = md.digest();

		return convertByteToHex(digest);
	}

	private static String convertByteToHex(byte[] byteData) {

		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < byteData.length; i++) {
			sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
		}

		return sb.toString();
	}

	public static List<String> match(List<String> al, String regex) {
		List<String> matches = new ArrayList<String>();
		Pattern p = Pattern.compile(regex);
		for (String str : al) {
			if (p.matcher(str).matches()) {
				matches.add(str);
			}
		}
		return matches;
	}

	public static class Pair<L, R> {
		final L left;
		final R right;

		public Pair(L left, R right) {
			this.left = left;
			this.right = right;
		}

		@SuppressWarnings("unchecked")
		public <T> T get(Class<T> param) {
			return (T) (param == this.left.getClass() ? this.left : this.right);
		}

		public static <L, R> Pair<L, R> of(L left, R right) {
			return new Pair<L, R>(left, right);
		}

		public String toString() {
			return "<" + this.left.toString() + "," + this.right.toString() + ">";
		}
	}

	public static List<List<String>> findPerms(List<String> floor) {
		List<List<String>> result = new ArrayList<List<String>>();
		for (int i = 0; i < floor.size() - 1; i++) {
			List<String> singleton = new ArrayList<String>();
			singleton.add(floor.get(i));
			result.add(singleton);
			for (int j = i + 1; j < floor.size(); j++) {
				List<String> pair = new ArrayList<String>();
				pair.add(floor.get(i));
				pair.add(floor.get(j));
				result.add(pair);
			}
		}
		List<String> singleton = new ArrayList<String>();
		singleton.add(floor.get(floor.size() - 1));
		result.add(singleton);
		return result;
	}

	public static class Node {
		public String name;
		public int weight;
		public Node parent;
		public List<Node> children;

		public Node(String name, int weight) {
			this.name = name;
			this.weight = weight;
		}

		public static void connect(Node parent, List<Node> children) {
			parent.children = children;
			for (Node child: children) {
				child.parent = parent;
			}
		}

		public int discWeight() {
			if(this.children != null) {
				int result = this.weight;
				for (Node child: this.children) {
					result+=child.discWeight();
				}
				return result;
			}
			else return this.weight;
		}
	}

	public static boolean isInteger(String input) {
		try {
			Integer.parseInt(input);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

}
