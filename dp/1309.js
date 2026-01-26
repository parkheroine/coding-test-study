"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const N = input[0];
const MOD = 9901;

function solution() {
  const dp = Array.from({ length: N + 1 }, () => Array(3).fill(0));
  dp[1] = [1, 1, 1];
  for (let i = 2; i <= N; i++) {
    dp[i][0] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2]) % MOD;
    dp[i][1] = (dp[i - 1][0] + dp[i - 1][2]) % MOD;
    dp[i][2] = (dp[i - 1][0] + dp[i - 1][1]) % MOD;
  }
  return dp[N].reduce((sum, item) => sum + item, 0) % MOD;
}

console.log(solution());
