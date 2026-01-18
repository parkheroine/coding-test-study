"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

function solution() {
  const N = input[0];
  const dp = [0, input[1], (input[2] ?? 0) + input[1]];

  for (let i = 3; i < input.length; i++) {
    dp[i] = Math.max(
      dp[i - 1], //i번째 와인 안 먹었을 때
      dp[i - 2] + input[i], //i번째 와인 먹고, i-1 와인도 안 먹음
      dp[i - 3] + input[i - 1] + input[i], //i번째 와인 먹고, i-1 와인도 먹음
    );
  }

  return dp[N];
}

console.log(solution());
