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
  let i = 0;
  let result = 0;
  while (result <= N) {
    i++;
    result = (i * (i + 1)) / 2;
  }

  return i - 1;
}

console.log(solution());
