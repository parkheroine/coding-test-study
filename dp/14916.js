"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);

function solution() {
  const dp = [];
  dp[0] = Infinity;
  dp[1] = Infinity;
  dp[2] = 1;
  dp[3] = Infinity;
  dp[4] = 2;
  dp[5] = 1;

  for (let i = 6; i < N + 1; i++) {
    dp[i] = Math.min(dp[i - 2], dp[i - 5]) + 1;
  }
  return dp[N] === Infinity ? -1 : dp[N];
}

console.log(solution());
