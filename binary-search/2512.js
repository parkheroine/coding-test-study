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
  const nums = [...input[1]];
  const limit = input[2][0];
  nums.sort((a, b) => a - b);

  let l = 0;
  let r = nums[nums.length - 1];

  let result = 0;
  while (l <= r) {
    const mid = Math.floor((r + l) / 2);

    let sum = 0;
    for (const num of nums) {
      sum += Math.min(num, mid);
    }

    if (sum <= limit) {
      result = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return result;
}
console.log(solution());
