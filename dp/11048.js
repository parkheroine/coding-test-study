"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const [N, M] = input[0];
input.splice(0, 1);

function solution() {
  const dp = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));
  dp[1][1] = input[0][0];
  for (let i = 1; i < N + 1; i++) {
    for (let j = 1; j < M + 1; j++) {
      dp[i][j] =
        Math.max(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) +
        input[i - 1][j - 1];
    }
  }
  return dp[N][M];
}

console.log(solution());
