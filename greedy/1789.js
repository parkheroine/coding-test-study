"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

function solution() {
  const N = input[0];
  let i = 1;
  let sum = 0;
  while (sum + i <= N) {
    sum += i;
    i++;
  }

  return i - 1;
}

console.log(solution());
