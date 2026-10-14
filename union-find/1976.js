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
  const N = input[0][0];
  const M = input[1][0];
  const edges = input.slice(2, 2 + N);
  const targetArr = input[2 + N];
  const parent = Array.from({ length: N + 1 }, (v, i) => i);

  function find(node) {
    if (parent[node] === node) return node;
    parent[node] = find(parent[node]);
    return parent[node];
  }

  function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) {
      parent[rootB] = rootA;
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (edges[i][j] === 1) {
        union(i + 1, j + 1);
      }
    }
  }

  const root = find(targetArr[0]);
  for (let i = 1; i < targetArr.length; i++) {
    if (root !== find(targetArr[i])) {
      return "NO";
    }
  }

  return "YES";
}

console.log(solution());
