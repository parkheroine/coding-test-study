"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim();

function solution() {
  const N = BigInt(input);
  let result = 0;
  let l = 0n;
  let r = N;

  while (l <= r) {
    const mid = (l + r) / 2n;

    if (mid * mid >= N) {
      result = mid;
      r = mid - 1n;
    } else {
      l = mid + 1n;
    }
  }

  return result.toString();
}

console.log(solution());
