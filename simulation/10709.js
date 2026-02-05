"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [H, W] = input[0].split(" ").map(Number);

function solution() {
  const result = Array.from({ length: H }, () => Array(W).fill(-1));

  for (let i = 1; i <= H; i++) {
    let cloudCount = -1;
    for (let j = 0; j < W; j++) {
      const value = input[i][j];
      if (value === "c") {
        cloudCount = 0;
      } else if (cloudCount !== -1) {
        cloudCount++;
      }
      result[i - 1][j] = cloudCount;
    }
  }

  return result.map((row) => row.join(" ")).join("\n");
}

console.log(solution());
