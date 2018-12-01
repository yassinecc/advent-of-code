package advent16;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Day14 extends tools{

	private static String findRepeat(String hash){
		String result = "";
		for(int i=0; i<hash.length()-2; i++){
			char candidate = hash.charAt(i);
			if(candidate==hash.charAt(i+1) && candidate==hash.charAt(i+2)){
				char[] chars = new char[5];
				Arrays.fill(chars, candidate);
				result = new String(chars);
				break;
			}
		}
		return result;
	}

	public static void main(String[] args) throws Exception{
		String input = "yjdafjpo";
		//		input = "abc";
		int hashNum = 0; // Part 1
		//		hashNum = 2016; // Part 2
		int idx = 0;
		String repeat = "";
		Map<String, Integer> candidates = new HashMap<String, Integer>();
		List<Integer> valid = new ArrayList<Integer>();
		int extra = -1;

		while(extra<1001){
			String salt = input + idx;
			String hash = getMD5Hex(salt);
			for(int i=0; i<hashNum; i++){
				hash = getMD5Hex(hash);
			}
			Map<String, Integer> toAdd = new HashMap<String, Integer>();
			List<String> toRemove = new ArrayList<String>();

			for(String key:candidates.keySet()){
				String five = key.split("x")[2];

				if(hash.contains(five)){
					valid.add(Integer.parseInt(key.split("x")[0]));
					toRemove.add(key);
					if(valid.size()==64 && extra<0){
						extra = 0;
					}
				}
				else{
					int triesLeft = candidates.get(key);
					if(triesLeft==1){
						toRemove.add(key);
					}
					else{
						toAdd.put(key,  triesLeft - 1);
					}
				}
			}
			candidates.keySet().removeAll(toRemove);
			candidates.putAll(toAdd);

			repeat = findRepeat(hash);
			
			if(!repeat.isEmpty()){
				candidates.put(idx + "x" + hash + "x" + repeat, 1000);
			}
			idx++;
			extra+= extra>=0 ? 1 : 0;
		}
		Collections.sort(valid);
		println("64th pad key generated at index " + valid.get(63));
	}
}
