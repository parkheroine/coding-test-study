"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/\s+/)
  .map(Number);

const [D, N, M] = [input[0], input[1], input[2]];
const stones = input.slice(3).sort((a, b) => a - b);
const nums = [...stones, D];

function solution() {
  let l = 0;
  let r = D;
  let result = 0;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    let removeCount = 0;
    let currentPos = 0;

    for (let i = 0; i < nums.length; i++) {
      if (nums[i] - currentPos < mid) {
        // 거리가 부족하면 이 돌을 제거
        removeCount++;
      } else {
        // 거리가 충분하면 이 돌로 이동
        currentPos = nums[i];
      }
    }

    if (removeCount <= M) {
      result = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return result;
}

console.log(solution());
