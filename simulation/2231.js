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
  const num = input[0][0];

  for (let i = 0; i <= num; i++) {
    let sum = i;
    let tmp = i;
    while (tmp > 0) {
      sum += tmp % 10;
      tmp = Math.floor(tmp / 10);
    }
    if (sum === num) {
      return i;
    }
  }
}

console.log(solution());
