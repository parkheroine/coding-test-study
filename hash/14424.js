"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
input.splice(0, 1);

function solution() {
  const set = new Set();
  for (let i = 0; i < N; i++) {
    set.add(input[i]);
  }
  let count = 0;

  for (let i = N; i < N + M; i++) {
    if (set.has(input[i])) {
      count++;
    }
  }
  return count;
}

console.log(solution());
