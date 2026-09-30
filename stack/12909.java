import java.util.*;

class Solution {
    boolean solution(String s) {
        boolean answer = true;

        int count = 0;

        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == '(') {
                count++;
            } else {
                count--;
            }

            if (count < 0) {
                return false;
            }

        }

        return count == 0 ? true : false;
    }
}