package advent16;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class Day10 extends tools{

	public static void execute(String next, Map<Integer, String> bot, Map<Integer, Integer> out){
		// "bot 0 gives low to output 2 and high to output 0"
		String[] nextArr = next.split(" ");
		String curBot = bot.get(Integer.parseInt(nextArr[1]));
		int lowValue = Integer.parseInt(curBot.split("x")[0]);
		int hiValue = Integer.parseInt(curBot.split("x")[1]);
		int id1 = Integer.parseInt(nextArr[6]);
		int id2 = Integer.parseInt(nextArr[11]);

		if(nextArr[5].equals("bot")){
			giveChip(bot, id1, lowValue);
		}
		else{
			out.put(id1, lowValue);
		}

		if(nextArr[10].equals("bot")){
			giveChip(bot, id2, hiValue);
		}
		else{
			out.put(id2, hiValue);
		}
	}

	public static void giveChip(Map<Integer, String> bot, int i, int chip){
		if(!bot.containsKey(i)){
			bot.put(i, Integer.toString(chip));
		}

		else{
			String botString = bot.get(i);
			if(botString.indexOf("x") < 0){
				int storedValue = Integer.parseInt(botString);
				int lowVal = storedValue<chip ? storedValue : chip;
				int hiVal = storedValue<chip ? chip : storedValue;
				// botString written as lowValue; hiValue
				String newStr = Integer.toString(lowVal)+"x"+Integer.toString(hiVal);
				bot.put(i, newStr);
			}
		}
	}

	public static boolean isFull(String botString){
		return botString == null ? false : (botString.indexOf("x") > -1);
	}

	public static void main(String[] args) {
		List<String> inFile = readFile("input10.txt");
		@SuppressWarnings("unused")
		List<String> testFile = readFile("test10.txt");
		Map<Integer, String> bot = new HashMap<Integer, String>();
		Map<Integer, Integer> out = new HashMap<Integer, Integer>();
		String goalPair = "17x61";
		Integer goalBot = -1;

		while(inFile.size()>0){
			List<String> newQueue = new ArrayList<String>();
			for(Iterator<String> it=inFile.iterator(); it.hasNext();){
				String el = it.next();
				if(el.split(" ")[0].equals("value")){ // "Value xx goes to bot yy"
					int value = Integer.parseInt(el.split(" ")[1]);
					int botIdx = Integer.parseInt(el.split(" ")[5]);
					giveChip(bot, botIdx, value);
				}
				else{
					String next = el; // Next instruction
					int botIdx = Integer.parseInt(next.split(" ")[1]);
					if(bot.containsKey(botIdx) && isFull(bot.get(botIdx))){

						if(bot.get(botIdx).equals(goalPair)){
							goalBot = botIdx;
						}
						execute(next, bot, out);

					}
					else{
						newQueue.add(next);
					}
				}
			}
			inFile = newQueue;
		}
		println("Goal bot is "+goalBot);
		int outProd = out.get(0)*out.get(1)*out.get(2);
		println("Product of chip values in first three output bins is " + outProd);
	}

}
