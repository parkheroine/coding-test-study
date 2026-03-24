"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [N, M] = input[0];

function solution() {
  const board = Array.from({ length: 100 }, () => Array(100).fill(0));

  for (let i = 1; i < N + 1; i++) {
    const [x1, y1, x2, y2] = input[i];

    for (let j = x1 - 1; j < x2; j++) {
      for (let k = y1 - 1; k < y2; k++) {
        board[k][j] += 1;
      }
    }
  }

  let result = 0;
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      if (board[i][j] > M) {
        result++;
      }
    }
  }

  return result;
}

console.log(solution());
