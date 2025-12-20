"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = Number(input[0]);
const [start, target] = input[1].split(" ").map(Number);
const M = Number(input[2]);
const graph = {};
const visited = Array(N + 1).fill(false);

for (let i = 1; i < N + 1; i++) {
  const index = i;
  graph[index] = [];
}

for (let i = 3; i < M + 3; i++) {
  const [nodeA, nodeB] = input[i].split(" ").map(Number);
  graph[nodeA].push(nodeB);
  graph[nodeB].push(nodeA);
}

function solution() {
  const stack = [[start, 0]];
  while (stack.length) {
    const [cur, result] = stack.pop();
    if (visited[cur]) continue;
    if (cur === target) return result;
    visited[cur] = true;

    for (const node of graph[cur]) {
      if (!visited[node]) {
        stack.push([node, result + 1]);
      }
    }
  }
  return -1;
}

console.log(solution());
