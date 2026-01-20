"use strict";

const fs = require("fs");
const { type } = require("os");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

function solution() {
  const result = [];

  for (let T = 0; T < (input.length - 1) / 3; T++) {
    const i = T * 3 + 1;
    const [N] = input[i];
    const sticker = [input[i + 1], input[i + 2]];
    const value = dp(N, sticker);
    result.push(value);
  }

  return result.join("\n");
}

function dp(N, sticker) {
  const memo = Array.from({ length: 2 }, () => Array(N).fill(0));

  memo[0][0] = sticker[0][0];
  memo[1][0] = sticker[1][0];
  if (N === 1) {
    return Math.max(memo[0][0], memo[1][0]);
  }
  memo[0][1] = sticker[1][0] + sticker[0][1];
  memo[1][1] = sticker[0][0] + sticker[1][1];

  if (N === 2) {
    return Math.max(memo[0][1], memo[1][1]);
  }

  for (let i = 2; i < N; i++) {
    memo[0][i] = Math.max(memo[1][i - 1], memo[1][i - 2]) + sticker[0][i];
    memo[1][i] = Math.max(memo[0][i - 1], memo[0][i - 2]) + sticker[1][i];
  }

  return Math.max(memo[0][N - 1], memo[1][N - 1]);
}

console.log(solution());
