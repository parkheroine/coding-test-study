"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

function createGraph() {
  const graph = {};
  const N = input[0][0];
  const M = input[0][1];
  const visited = Array(N + 1).fill(false);

  for (let i = 1; i < N + 1; i++) {
    graph[i] = [];
  }
  for (let i = 1; i < input.length; i++) {
    const [nodeA, nodeB] = input[i];
    graph[nodeA].push(nodeB);
    graph[nodeB].push(nodeA);
  }
  return { graph, N, visited };
}

function solution() {
  const { graph, N, visited } = createGraph();
  let result = 0;

  for (let i = 1; i < N + 1; i++) {
    if (visited[i]) continue;
    result++;
    const stack = [[i, -1]];
    while (stack.length) {
      const [cur, parent] = stack.pop();
      if (visited[cur]) continue;
      visited[cur] = true;

      for (const node of graph[cur]) {
        if (!visited[node]) {
          stack.push([node, cur]);
        }
      }
    }
  }

  return result;
}

console.log(solution());
