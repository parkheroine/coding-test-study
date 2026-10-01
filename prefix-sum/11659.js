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
  const [[N, M], nums, ...targets] = input;
  const sum = [];
  sum.push(nums[0]);

  for (let i = 1; i < nums.length; i++) {
    sum[i] = sum[i - 1] + nums[i];
  }

  const result = [];
  for (let k = 0; k < targets.length; k++) {
    const [i, j] = targets[k];
    const a = i - 1;
    const b = j - 1;

    result.push(sum[b] - (a - 1 < 0 ? 0 : sum[a - 1]));
  }

  return result.join("\n");
}
console.log(solution());
