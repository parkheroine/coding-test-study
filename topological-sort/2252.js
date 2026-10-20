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
  const [[N, M], ...hArr] = input;
  const degree = Array(N + 1).fill(0);
  const nexts = Array.from({ length: N + 1 }, () => []);
  const queue = [];
  let head = 0;

  for (const [A, B] of hArr) {
    degree[B]++;
    nexts[A].push(B);
  }

  for (let i = 1; i <= N; i++) {
    if (degree[i] === 0) {
      queue.push(i);
    }
  }

  const result = [];
  while (head < queue.length) {
    const cur = queue[head++];
    result.push(cur);
    for (const next of nexts[cur]) {
      degree[next]--;
      if (degree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return result.join(" ");
}

console.log(solution());
