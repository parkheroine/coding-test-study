"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [N, M] = input[0];
const trees = input[1];
trees.sort((a, b) => a - b);

function solution() {
  let l = 0;
  let r = trees[trees.length - 1];
  let result;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    let sum = 0;
    for (const tree of trees) {
      sum += Math.max(tree - mid, 0);
    }

    if (sum === M) {
      return mid;
    } else if (sum < M) {
      r = mid - 1;
    } else {
      l = mid + 1;
      result = mid;
    }
  }
  return result;
}

console.log(solution());
