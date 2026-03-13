"use strict";

const fs = require("fs");
const { resourceLimits } = require("worker_threads");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

function solution() {
  const nums = [...input[1]].sort((a, b) => a - b);

  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    const target = nums[i];
    let l = 0;
    let r = nums.length - 1;

    while (l < r) {
      //자기 자신은 포함 X
      if (l === i) {
        l++;
        continue;
      } else if (r === i) {
        r--;
        continue;
      }
      const sum = nums[l] + nums[r];
      if (sum === target) {
        result++;
        break;
      } else if (sum < target) {
        //sum 더 크게
        l++;
      } else {
        //sum 더 작게
        r--;
      }
    }
  }

  return result;
}

console.log(solution());
