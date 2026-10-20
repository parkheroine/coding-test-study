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
  const [[N], ...edges] = input;
  const adj = Array.from({ length: N + 1 }, () => []);
  const parents = Array(N + 1).fill(-1);
  const queue = [];
  let head = 0;

  for (const edge of edges) {
    const [A, B] = edge;
    adj[A].push(B);
    adj[B].push(A);
  }

  parents[1] = 1;
  for (let i = 0; i < adj[1].length; i++) {
    const next = adj[1][i];
    queue.push(next);
    parents[next] = 1;
  }

  while (head < queue.length) {
    const cur = queue[head++];

    for (const next of adj[cur]) {
      if (parents[next] !== -1) continue;
      queue.push(next);
      parents[next] = cur;
    }
  }

  return parents.slice(2).join("\n");
}

console.log(solution());
