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
  const [[N, M]] = input;

  const initGrid = input.slice(1, N + 1);
  const grid = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));
  const targets = input.slice(N + 1);

  const sum = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      grid[i + 1][j + 1] = initGrid[i][j];
      sum[i + 1][j + 1] =
        sum[i][j + 1] + sum[i + 1][j] + grid[i + 1][j + 1] - sum[i][j];
    }
  }

  const result = [];
  for (let i = 0; i < targets.length; i++) {
    const [x1, y1, x2, y2] = targets[i];
    const temp =
      sum[x2][y2] - sum[x1 - 1][y2] - sum[x2][y1 - 1] + sum[x1 - 1][y1 - 1];
    result.push(temp);
  }

  return result.join("\n");
}
console.log(solution());
