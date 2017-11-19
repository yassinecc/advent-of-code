package advent16;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map.Entry;
import java.util.TreeMap;

public class Day20 extends tools{

	public static void main(String[] args) {
		List<String> input = readFile("input20.txt");
		TreeMap<Long, Long> ranges = new TreeMap<Long,Long>();

		for(String el:input){
			String[] splitted = el.split("-");
			Arrays.toString(splitted);
			long key =Long.parseLong(splitted[0]);
			long value = Long.parseLong(splitted[1]);
			ranges.put(key, value);
		}

		long candidate = 0;
		String interval = input.get(0);
		long count = 0;
		List<String> intervalList = new ArrayList<String>();
		
		while(!ranges.isEmpty()){
			Entry<Long, Long> mapping = ranges.pollFirstEntry();
			long key = mapping.getKey();
			long value = mapping.getValue();
			
			if(key>candidate){
				intervalList.add(interval);
				count+= key - Long.parseLong(interval.split("-")[1]) - 1;
				interval = mapping.getKey() + "-" + mapping.getValue();
				candidate = value + 1;
				continue;
			}
			else if(value<candidate){
				continue;
			}
			else{
				String newKey = interval.split("-")[0];
				String newValue = mapping.getValue().toString();
				interval = newKey + "-" + newValue;
				candidate = value + 1;
			}
		}
		String firstKey = intervalList.get(0).split("-")[1];
		long lowest = Long.parseLong(firstKey) + 1;
		println("Lowest non-blocked IP is " + lowest);
		println("There are " + count + " valid IPs");
		
	}

}
