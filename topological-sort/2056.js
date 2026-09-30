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
  const [[N], ...jobs] = input;
  const degree = Array(N + 1).fill(0);
  const nexts = Array.from({ length: N + 1 }, () => []);
  const queue = [];
  let head = 0;
  const dp = Array(N + 1).fill(0);
  for (let i = 0; i < jobs.length; i++) {
    const [time, num] = jobs[i];
    degree[i + 1] = num;
    for (let j = 0; j < num; j++) {
      nexts[jobs[i][j + 2]].push(i + 1);
    }
    if (num === 0) {
      queue.push([i + 1]);
    }
  }

  while (head < queue.length) {
    const [cur] = queue[head++];
    const curT = jobs[cur - 1][0];
    dp[cur] += curT;

    for (const next of nexts[cur]) {
      dp[next] = Math.max(dp[next], dp[cur]);
      degree[next]--;
      if (degree[next] === 0) {
        queue.push([next]);
      }
    }
  }

  return Math.max(...dp);
}

console.log(solution());
