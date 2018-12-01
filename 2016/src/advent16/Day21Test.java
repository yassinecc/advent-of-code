package advent16;

import static org.junit.Assert.*;

import org.junit.Test;

public class Day21Test {


	@Test
	public void swapPositionsTest() {
		String result = Day21.swapPositions("abcde", 4, 0);
		assertTrue(result.equals("ebcda"));
		
	}
	
	@Test
	public void swapLettersTest() {
		String result = Day21.swapLetters("ebcda", 'd', 'b');
		assertTrue(result.equals("edcba"));
	}
	
	@Test
	public void rotateLeftTest() {
		String result = Day21.rotateLeft("abcd", 1);
		assertTrue(result.equals("bcda"));
	}
	
	@Test
	public void rotateRightTest() {
		String result = Day21.rotateRight("abcd", 1);
		assertTrue(result.equals("dabc"));
	}
	
	@Test
	public void rotateBasedOnPositionTest1() {
		String result = Day21.rotateBasedOnPosition("abcdef", 'b');
		assertTrue(result.equals("efabcd"));
	}
	
	@Test
	public void rotateBasedOnPositionTest2() {
		String result = Day21.rotateBasedOnPosition("abcdefghijkl", 'e');
		assertTrue(result.equals("ghijklabcdef"));
	}
	
	@Test
	public void invert_rotateBasedOnPositionTest1() {
		String result = Day21.invert_rotateBasedOnPosition("efabcd", 'b');
		assertTrue(result.equals("abcdef"));
	}
	
	@Test
	public void invert_rotateBasedOnPositionTest2() {
		String result = Day21.invert_rotateBasedOnPosition("cdefghab", 'e');
		assertTrue(result.equals("abcdefgh"));
	}
	
	@Test
	public void reverseTest() {
		String result = Day21.reverse("abcdefghijkl", 3, 6);
		assertTrue(result.equals("abcgfedhijkl"));
	}
	
	@Test
	public void moveTest1() {
		String result = Day21.move("abcdef", 1, 4);
		assertTrue(result.equals("acdebf"));
	}
	
	@Test
	public void moveTest2() {
		String result = Day21.move("abcdef", 4, 1);
		assertTrue(result.equals("aebcdf"));
	}

}
