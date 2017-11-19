package advent16;
import java.util.ArrayList;

public class Day7 extends tools{

	private static boolean hasABBA(String in){
		int length = in.length();
		boolean result = false;
		search:
			for(int i=0; i<length-3; i++){
				boolean aa = in.charAt(i)==in.charAt(i+3); // the A..A in ABBA
				boolean bb = in.charAt(i+1)==in.charAt(i+2); // the .BB. in ABBA
				boolean ab = in.charAt(i)!=in.charAt(i+1); // the AB.. in ABBA
				if(aa && bb && ab){
					result = true;
					break search;
				}
			}
		return result;
	}
	
	private static ArrayList<String> hasABA(String in){
		int length = in.length();
		ArrayList<String> list = new ArrayList<String>();
			for(int i=0; i<length-2; i++){
				boolean aa = in.charAt(i)==in.charAt(i+2); // the A.A in ABA
				boolean ab = in.charAt(i)!=in.charAt(i+1); // the AB. in ABA
				if(aa && ab){
					list.add(""+in.charAt(i)+in.charAt(i+1)+in.charAt(i+2));
				}
			}
		return list;
	}
	
	private static ArrayList<String> hasBAB(String in){
		int length = in.length();
		ArrayList<String> list = new ArrayList<String>();
			for(int i=0; i<length-2; i++){
				boolean aa = in.charAt(i)==in.charAt(i+2); // the A.A in ABA
				boolean ab = in.charAt(i)!=in.charAt(i+1); // the AB. in ABA
				if(aa && ab){
					list.add(""+in.charAt(i+1)+in.charAt(i)+in.charAt(i+1));
				}
			}
		return list;
	}

	public static void main(String[] args){
		ArrayList<String> input = readFile("input7.txt");
		int tls_ctr = 0;
		int ssl_ctr = 0;
		for(String el:input){
			String[] temp = el.split("\\[|\\]");
			int length = temp.length;
			int max_ip_idx = (length/2)*2;
			int max_hyper_idx = ((length - 2)/2)*2 + 1;
			boolean ip_bool = false;
			boolean hyper_bool = true;
			ArrayList<String> ip_list = new ArrayList<String>();
			ArrayList<String> hyper_list = new ArrayList<String>();
			
				for(int i=0; i<=max_ip_idx; i+=2){
					if(!ip_bool && hasABBA(temp[i])){
						ip_bool = true;
					}
					ip_list.addAll(hasABA(temp[i]));
				}
			
				for(int j=1; j<=max_hyper_idx; j+=2){
					if(hyper_bool && hasABBA(temp[j])){
						hyper_bool = false;
					}
					hyper_list.addAll(hasBAB(temp[j]));
				}
			ip_bool = hasABBA(el);
			if(ip_bool && hyper_bool){
				tls_ctr++;
			}
			ArrayList<String> comp = new ArrayList<String>(ip_list);
			comp.retainAll(hyper_list);
			if(!comp.isEmpty()) ssl_ctr++;
		}
		println(tls_ctr+" IPs support TLS");
		println(ssl_ctr+" IPs support SSL");
	}
}
