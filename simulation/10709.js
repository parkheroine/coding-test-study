"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [H, W] = input[0].split(" ").map(Number);

function solution() {
  const clouds = [];
  const result = [];
  for (let i = 1; i <= H; i++) {
    result.push([]);
    for (let j = 0; j < W; j++) {
      const value = input[i][j];
      if (value === "c") {
        result[i - 1].push(0);
        clouds.push([i - 1, j]);
      } else {
        result[i - 1].push(-1);
      }
    }
  }

  for (const [cY, cX] of clouds) {
    let xIndex = cX + 1;
    let tic = 1;
    while (xIndex < W && result[cY][xIndex] === -1) {
      result[cY][xIndex] = tic;
      xIndex++;
      tic++;
    }
  }

  return result.map((row) => row.join(" ")).join("\n");
}

console.log(solution());
