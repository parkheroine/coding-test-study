"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

let i = 0;

const result = [];

while (i < input.length - 1) {
  const [W, H] = input[i];
  i++;

  const count = H + i;
  const visited = Array.from({ length: H + 2 }, () => Array(W + 2).fill(false));

  const graph = [];
  graph.push(Array(W + 2).fill(0));
  for (let j = i; j < count; j++) {
    graph.push([0, ...input[i], 0]);
    i++;
  }
  graph.push(Array(W + 2).fill(0));

  solution(graph, visited, W, H);
}

function solution(graph, visited, W, H) {
  let count = 0;
  for (let i = 1; i < H + 1; i++) {
    for (let j = 1; j < W + 1; j++) {
      if (!visited[i][j] && graph[i][j] === 1) {
        dfs(i, j, visited, graph);
        count++;
      }
    }
  }

  result.push(count);
}

function dfs(y, x, visited, graph) {
  const stack = [[y, x]];

  const direction = [
    [-1, -1],
    [-1, 1],
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  while (stack.length) {
    const [curY, curX] = stack.pop();
    if (visited[curY][curX]) continue;
    visited[curY][curX] = true;
    for (const dItem of direction) {
      const [dY, dX] = dItem;
      const newY = dY + curY;
      const newX = dX + curX;
      if (!visited[newY][newX] && graph[newY][newX] === 1) {
        stack.push([newY, newX]);
      }
    }
  }
}
console.log(result.join("\n"));
