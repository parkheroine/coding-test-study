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
  const [[N, M], ...subs] = input;
  if (M === 0) return Array(N).fill(1).join(" ");

  const degree = Array(N + 1).fill(0);
  const nexts = Array.from({ length: N + 1 }, () => []);
  const queue = [];
  let head = 0;
  for (let i = 0; i < subs.length; i++) {
    const [A, B] = subs[i];
    nexts[A].push(B);
    degree[B]++;
  }

  for (let i = 1; i <= N; i++) {
    if (degree[i] === 0) {
      queue.push([i, 1]);
    }
  }

  const result = Array(N);

  while (head < queue.length) {
    const [cur, term] = queue[head++];
    result[cur - 1] = term;

    for (const next of nexts[cur]) {
      degree[next]--;
      if (degree[next] === 0) {
        queue.push([next, term + 1]);
      }
    }
  }

  return result.join(" ");
}

console.log(solution());
