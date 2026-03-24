"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const nums = input[1].split(",").map(Number);

function solution() {
  for (let i = 0; i < K; i++) {
    for (let j = 1; j < N - i; j++) {
      nums[j - 1] = nums[j] - nums[j - 1];
    }
    nums.pop();
  }

  return nums.join(",");
}

console.log(solution());
