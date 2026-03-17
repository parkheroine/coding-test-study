"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const [N] = input[0];
const maze = input[1];

function solution() {
  const dp = Array(N).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i < maze.length; i++) {
    const maxJump = maze[i];
    for (let j = i + 1; j <= i + maxJump; j++) {
      dp[j] = Math.min(dp[j], dp[i] + 1);
    }
  }

  return dp[N - 1] === Infinity ? -1 : dp[N - 1];
}

console.log(solution());
