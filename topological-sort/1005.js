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
  const T = input[0][0];
  let index = 1;

  const result = [];

  for (let t = 0; t < T; t++) {
    const [N, M] = input[index++];
    const times = [0, ...input[index++]];
    const degree = Array(N + 1).fill(0);
    const nexts = Array.from({ length: N + 1 }, () => []);
    const dp = Array(N + 1).fill(0);
    const queue = [];
    let head = 0;

    for (let i = index; i < index + M; i++) {
      const [A, B] = input[i];
      degree[B]++;
      nexts[A].push(B);
    }
    index += M;

    for (let i = 0; i < degree.length; i++) {
      if (degree[i] === 0) {
        queue.push(i);
        dp[i] = times[i];
      }
    }

    while (head < queue.length) {
      const cur = queue[head++];

      for (const next of nexts[cur]) {
        dp[next] = Math.max(dp[cur] + times[next], dp[next]);
        degree[next]--;
        if (degree[next] === 0) {
          queue.push(next);
        }
      }
    }

    const [targetNum] = input[index++];
    result.push(dp[targetNum]);
  }

  return result.join("\n");
}

console.log(solution());
