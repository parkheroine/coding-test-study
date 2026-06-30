import java.util.*;

class Solution {
    public int[] solution(int[] progresses, int[] speeds) {
        final int N = progresses.length;
        int[] leftDays = new int[N];
        List<Integer> list = new ArrayList();

        for (int i = 0; i < N; i++) {
            leftDays[i] = (100 - progresses[i] + (speeds[i] - 1)) / speeds[i];
        }

        int prev = leftDays[0];
        int count = 1;
        for (int i = 1; i < N; i++) {
            if (prev < leftDays[i]) {
                list.add(count);
                count = 1;
                prev = leftDays[i];
            } else {
                count++;
            }
        }

        // 남은 거 처리
        list.add(count);

        // 정답 반환
        int[] answer = new int[list.size()];
        for (int i = 0; i < list.size(); i++) {
            answer[i] = list.get(i);
        }
        return answer;
    }
}