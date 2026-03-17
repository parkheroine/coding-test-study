"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

function solution() {
  const [N] = input[0];
  const graph = Array.from({ length: N + 1 }, () => []);
  const visited = Array(N + 1).fill(false);
  const dp = Array.from({ length: N + 1 }, () => [0, 1]);

  for (let i = 1; i < input.length; i++) {
    const [A, B] = input[i];
    graph[A].push(B);
    graph[B].push(A);
  }

  dfs(1);

  function dfs(cur) {
    visited[cur] = true;
    dp[cur][1] = 1;

    for (const next of graph[cur]) {
      if (visited[next]) continue;
      dfs(next);
      dp[cur][0] += dp[next][1];
      dp[cur][1] += Math.min(...dp[next]);
    }
  }

  return Math.min(...dp[1]);
}

console.log(solution());
