"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const [N] = input[0];
input.splice(0, 1);

function solution() {
  const sumAB = new Map();

  let idx = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const a = input[i][0];
      const b = input[j][1];
      sumAB.set(a + b, (sumAB.get(a + b) || 0) + 1);
      idx++;
    }
  }

  let result = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const c = input[i][2];
      const d = input[j][3];
      const sum = c + d;
      if (sumAB.has(-sum)) {
        result += sumAB.get(-sum);
      }
    }
  }

  return result;
}

console.log(solution());
