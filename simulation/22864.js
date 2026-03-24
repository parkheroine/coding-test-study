"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const [A, B, C, M] = input;

function solution() {
  let h = 0;
  let result = 0;

  for (let i = 0; i < 24; i++) {
    if (h + A <= M) {
      h += A;
      result += B;
    } else {
      h = Math.max(h - C, 0);
    }
  }

  return result;
}

console.log(solution());
