"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [M, N] = input[0];
const snacks = input[1];

function solution() {
  let l = 1;
  let r = Math.max(...snacks);

  let result = 0;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    let total = 0;

    for (const snack of snacks) {
      total += Math.floor(snack / mid);
    }

    if (total >= M) {
      l = mid + 1;
      result = mid;
    } else {
      r = mid - 1;
    }
  }
  return result;
}

console.log(solution());
