"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
input.splice(0, 1);
const nums = input.map(Number);

function solution() {
  const sorted = [...nums].sort((a, b) => a - b);
  let l = sorted[N - 1];
  let r = sorted.reduce((prev, cur) => prev + cur, 0);
  let result = sorted[N - 1];

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    let count = 0;
    let leftMoney = 0;
    for (let i = 0; i < N; i++) {
      const cur = nums[i];
      if (leftMoney < cur) {
        count++;
        leftMoney = mid - cur;
      } else {
        leftMoney -= cur;
      }
    }

    if (count <= M) {
      result = mid;
      r = mid - 1;
    } else if (count > M) {
      l = mid + 1;
    }
  }

  return result;
}

console.log(solution());
