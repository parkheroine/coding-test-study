"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

function solution() {
  const result = [];
  for (let i = 1; i < input.length; i++) {
    const [a, b, c] = input[i].sort((a, b) => a - b);

    let ans;
    if (a === b && b === c) {
      ans = "equilateral";
    } else if (c >= a + b) {
      ans = "invalid!";
    } else if (a !== b && b !== c && a !== c) {
      ans = "scalene";
    } else {
      ans = "isosceles";
    }

    result.push(`Case #${i}: ${ans}`);
  }

  return result.join("\n");
}

console.log(solution());
