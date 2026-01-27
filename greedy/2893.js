"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = Number(input[0]);

function solution() {
  let remained = N;
  let result = 0;

  while (remained >= 0) {
    if (remained % 5 === 0) {
      return result + remained / 5;
    }
    remained -= 3;
    result++;
  }
  return -1;
}

console.log(solution());
