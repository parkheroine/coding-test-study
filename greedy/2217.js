"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);
input.splice(0, 1);

function solution() {
  input.sort((a, b) => b - a);

  let max = input[0];
  for (let i = 1; i < input.length; i++) {
    const cur = input[i];
    const newValue = (i + 1) * cur;
    if (newValue > max) {
      max = newValue;
    }
  }

  return max;
}

console.log(solution());
