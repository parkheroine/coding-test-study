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
  const [[N], parents, [deletedNum]] = input;
  const adj = Array.from({ length: N }, () => []);
  const visited = Array(N).fill(false);

  const queue = [];
  let head = 0;

  let root = -1;
  for (let i = 0; i < parents.length; i++) {
    const p = parents[i];
    if (p === -1) {
      root = i;
      continue;
    }
    adj[i].push(p);
    adj[p].push(i);
  }

  if (root !== deletedNum) {
    queue.push(root);
    visited[root] = true;
  }

  let result = 0;

  while (head < queue.length) {
    const cur = queue[head++];

    let flag = true;
    for (const next of adj[cur]) {
      if (visited[next] || next === deletedNum) continue;
      flag = false;
      queue.push(next);
      visited[next] = true;
    }

    if (flag) {
      result++;
    }
  }

  return result;
}

console.log(solution());
