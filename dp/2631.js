"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

function solution() {
  const N = input[0];
  const dp = Array(N + 1).fill(1);

  for (let i = 1; i < input.length; i++) {
    for (let j = 1; j < i; j++) {
      if (input[j] < input[i]) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
    }
  }

  return N - Math.max(...dp);
}

console.log(solution());
