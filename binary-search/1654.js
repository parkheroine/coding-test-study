"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [K, N] = input[0].split(" ").map(Number);
input.splice(0, 1);

function solution() {
  const nums = [];
  let maxNum = 0;
  for (let i = 0; i < input.length; i++) {
    const val = +input[i];
    nums.push(val);
    if (maxNum < val) {
      maxNum = val;
    }
  }
  let l = 1;
  let r = maxNum;
  let result = 1;
  while (l <= r) {
    const length = Math.floor((l + r) / 2);
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
      count += Math.floor(nums[i] / length);
    }
    if (count >= N) {
      l = length + 1;
      result = length;
    } else if (count < N) {
      r = length - 1;
    }
  }
  return result;
}

console.log(solution());
