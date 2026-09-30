const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

function solution() {
  const N = Number(input[0]);
  const W = [];
  for (let i = 1; i <= N; i++) {
    W.push(input[i].split(" ").map(Number));
  }

  // 모든 도시를 방문했을 때의 비트 상태 (예: N=4이면 1111(2) = 15)
  const ALL_VISITED = (1 << N) - 1;
  const INF = 1e9; // 충분히 큰 값

  // dp[cur][visited]: 현재 cur에 있고 visited 상태일 때, 남은 도시를 순회하는 최소 비용
  const dp = Array.from({ length: N }, () => Array(1 << N).fill(-1));

  // DFS + DP 메모이제이션
  function tsp(cur, visited) {
    // 1. 기저 조건: 모든 도시를 다 방문한 경우
    if (visited === ALL_VISITED) {
      // 마지막 도시(cur)에서 다시 출발지(0번)로 돌아갈 수 있는 길이 있는가?
      return W[cur][0] > 0 ? W[cur][0] : INF;
    }

    // 2. 이미 계산된 결과가 있는 경우 (메모이제이션)
    if (dp[cur][visited] !== -1) {
      return dp[cur][visited];
    }

    dp[cur][visited] = INF;

    // 3. 다음으로 방문할 도시 탐색
    for (let next = 0; next < N; next++) {
      // 이동 경로가 없거나(0), 이미 방문한 도시라면 스킵
      if (W[cur][next] === 0 || (visited & (1 << next)) !== 0) continue;

      // next 도시를 방문 처리(visited | (1 << next))하고 재귀 호출
      const cost = W[cur][next] + tsp(next, visited | (1 << next));
      dp[cur][visited] = Math.min(dp[cur][visited], cost);
    }

    return dp[cur][visited];
  }

  // 0번 도시에서 출발 (방문 상태: 000...0001 = 1 << 0)
  return tsp(0, 1 << 0);
}

console.log(solution());
