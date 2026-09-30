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
  let index = 0;
  const T = input[index++][0];
  const result = [];

  for (let t = 0; t < T; t++) {
    const [N, M] = input[index++];
    const degree = Array(N + 1).fill(0);
    const adj = Array.from({ length: N + 1 }, () => []);
    const queue = [];
    let head = 0;
    const times = [0, ...input[index++]];
    const dp = Array(N + 1).fill(0);

    for (let i = index; i < index + M; i++) {
      const [A, B] = input[i];
      adj[A].push(B);
      degree[B]++;
    }
    index = index + M;
    const W = input[index++];

    for (let i = 1; i < degree.length; i++) {
      if (degree[i] === 0) {
        queue.push(i);
      }
    }

    while (head < queue.length) {
      const cur = queue[head++];
      dp[cur] += times[cur];

      for (const next of adj[cur]) {
        dp[next] = Math.max(dp[next], dp[cur]);
        degree[next]--;
        if (degree[next] === 0) {
          queue.push(next);
        }
      }
    }

    result.push(dp[W]);
  }

  return result.join("\n");
}

console.log(solution());
