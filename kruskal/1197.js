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
  const [[V, E], ...edges] = input;

  edges.sort((a, b) => a[2] - b[2]);
  const parent = Array.from({ length: V + 1 }, (_, i) => i);

  function find(node) {
    if (parent[node] === node) return node;
    return (parent[node] = find(parent[node]));
  }

  function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) {
      parent[rootB] = rootA;
      return true;
    }
    return false;
  }

  let result = 0;

  for (const [from, to, cost] of edges) {
    if (union(from, to)) {
      result += cost;
    }
  }

  return result;
}

console.log(solution());
