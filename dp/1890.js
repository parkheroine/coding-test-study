"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const [N] = input[0];
input.splice(0, 1);

function solution() {
  const dp = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0n));
  dp[1][1] = 1n;

  for (let i = 1; i < N + 1; i++) {
    for (let j = 1; j < N + 1; j++) {
      const value = input[i - 1][j - 1];
      if (dp[i][j] === 0n || (i === N && j === N)) continue;
      if (i + value < N + 1) {
        dp[i + value][j] += dp[i][j];
      }
      if (j + value < N + 1) {
        dp[i][j + value] += dp[i][j];
      }
    }
  }

  return dp[N][N].toString();
}

console.log(solution());
