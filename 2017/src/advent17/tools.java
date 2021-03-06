package advent17;

import java.io.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Pattern;

public class tools {
	public static ArrayList<String> readFile(String fileName) {
		// Reads a text file line by line. Each line is stored as an ArrayList string
		// element
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

	public static Integer[] parseToIntArray(String[] array) {
		Integer[] result = new Integer[array.length];
		for (int index = 0; index < array.length; index++) {
			result[index] = Integer.parseInt(array[index]);
		}
		return result;
	}

	public static int[] max(List<Integer> intArray) {
		if (intArray.size() < 1)
			return new int[] { 0, -1 };
		int candidate = intArray.get(0);
		int candidateIndex = 0;
		for (int i = 1; i < intArray.size(); i++) {
			if (candidate < intArray.get(i)) {
				candidate = intArray.get(i);
				candidateIndex = i;
			}
			;
		}
		return new int[] { candidate, candidateIndex };
	}

	public static int[] min(List<Integer> intArray) {
		if (intArray.size() < 1)
			return new int[] { 0, -1 };
		int candidate = intArray.get(0);
		int candidateIndex = 0;
		for (int i = 1; i < intArray.size(); i++) {
			if (candidate > intArray.get(i)) {
				candidate = intArray.get(i);
				candidateIndex = i;
			}
			;
		}
		return new int[] { candidate, candidateIndex };
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

	public static void removeByIndices(List<Triplet> list, List<Integer> indicesList) {
		Collections.sort(indicesList, Collections.reverseOrder());
		for (int index : indicesList) {
			list.remove(index);
		}
	}

	public static class Triplet {
		final Integer x;
		final Integer y;
		final Integer z;

		public Triplet(Integer x, Integer y, Integer z) {
			this.x = x;
			this.y = y;
			this.z = z;
		}

		public static Triplet of(Integer x, Integer y, Integer z) {
			return new Triplet(x, y, z);
		}

		@Override
		public int hashCode() {
			return (this.x + "x" + this.y + "x" + this.z).hashCode();
		}

		@Override
		public boolean equals(Object triplet) {
			return (this.x == ((Triplet) triplet).x && this.y == ((Triplet) triplet).y && this.z == ((Triplet) triplet).z);
		}

		public static Triplet of(String[] array) {
			int x = Integer.parseInt(array[0]);
			int y = Integer.parseInt(array[1]);
			int z = Integer.parseInt(array[2]);
			return new Triplet(x, y, z);
		}

		public static Triplet of(int[] array) {
			int x = array[0];
			int y = array[1];
			int z = array[2];
			return new Triplet(x, y, z);
		}

		public Triplet add(Triplet t) {
			return new Triplet(this.x + t.x, this.y + t.y, this.z + t.z);
		}

		public String toString() {
			return "<" + this.x + "," + this.y + "," + this.z + ">";
		}

		public int norm() {
			return this.x * this.x + this.y * this.y + this.z * this.z;
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

	public static List<List<String>> convertListTo2DList(List<String> inputFile) {
		int xMax = inputFile.size();
		int yMax = inputFile.get(0).length();
		List<List<String>> newList = new ArrayList<List<String>>();
		for (int i = 0; i < xMax; i++) {
			List<String> newLine = new ArrayList<String>();
			for (int j = 0; j < yMax; j++) {
				newLine.add(String.valueOf(inputFile.get(i).charAt(j)));
			}
			newList.add(newLine);
		}
		return newList;
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
			for (Node child : children) {
				child.parent = parent;
			}
		}

		public int discWeight() {
			if (this.children != null) {
				int result = this.weight;
				for (Node child : this.children) {
					result += child.discWeight();
				}
				return result;
			} else
				return this.weight;
		}
	}

	public static String reverse(String s) {
		String result = "";
		for (int i = s.length() - 1; i >= 0; i--) {
			result += s.charAt(i);
		}
		return result;
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
