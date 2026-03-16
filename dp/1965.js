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
  const [N] = input[0];
  const dp = Array(N).fill(1);

  const boxes = [...input[1]];

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (boxes[i] > boxes[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}

console.log(solution());
