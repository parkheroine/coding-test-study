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
  const [[N], ...stars] = input;
  const costs = [];
  const parent = Array.from({ length: N }, (_, i) => i);

  for (let i = 0; i < stars.length - 1; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const [x1, y1] = stars[i];
      const [x2, y2] = stars[j];
      const cost = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
      costs.push([i, j, cost]);
    }
  }

  costs.sort((a, b) => a[2] - b[2]);

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
  for (const [from, to, cost] of costs) {
    if (union(from, to)) {
      result += cost;
    }
  }

  return result.toFixed(2);
}

console.log(solution());
