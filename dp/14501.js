"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const N = input[0][0];

function solution() {
  const dp = new Array(N + 2).fill(0);

  for (let i = N; i > 0; i--) {
    const [T, P] = input[i];
    if (T + i > N + 1) {
      dp[i] = dp[i + 1];
      continue;
    }
    dp[i] = Math.max(P + dp[i + T], dp[i + 1]);
  }

  return dp[1];
}

console.log(solution());
