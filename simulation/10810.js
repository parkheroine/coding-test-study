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

function solution() {
  const bucket = Array(N).fill(0);

  for (let i = 1; i < input.length; i++) {
    const [s, e, k] = input[i];
    for (let j = s; j <= e; j++) {
      bucket[j - 1] = k;
    }
  }

  return bucket.join(" ");
}

console.log(solution());
