package advent16;

public class Day16 extends tools {

	private static String dragon(String a) {
		String b = a;
		b = new StringBuilder(b).reverse().toString();
		b = b.replace('0', '2').replace('1', '0').replace('2', '1');
		a = a + "0" + b;
		return a;
	}

	private static byte[] checksum(String str) {
		byte[] byt = str.getBytes();
		while (byt.length % 2 == 0) {
			byte[] byt2 = new byte[byt.length / 2];
			for (int i = 0; i < byt.length - 1; i += 2) {
				byt2[i / 2] = (byte) (byt[i] == byt[i + 1] ? 1 : 0);
			}
			byt = byt2;
		}
		return byt;
	}

	public static void main(String[] args) {
		int diskSize = 272; // Part 1
		diskSize = 35651584; // Part 2

		String state = "00111101111101000";

		// diskSize = 20;
		// state = "10000"; //Test
		while (state.length() < diskSize) {
			state = dragon(state);
		}
		state = state.substring(0, diskSize);
		byte[] result = checksum(state);
		print("Checksum is ");
		for (int i = 0; i < result.length; i++) {
			print(result[i]);
		}
		println("");
	}

}
