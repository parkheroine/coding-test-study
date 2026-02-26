"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const [N, M] = input[0];

function solution() {
  const graph = {};
  const countArr = [];

  for (let i = 1; i < N + 1; i++) {
    graph[i] = [];
  }

  for (let i = 1; i < input.length; i++) {
    const [A, B] = input[i];
    graph[B].push(A);
  }

  for (let i = 1; i < N + 1; i++) {
    const count = dfs(i);
    countArr.push([i, count]);
  }

  countArr.sort((a, b) => b[1] - a[1]);

  const maxCount = countArr[0][1];
  const result = [countArr[0][0]];

  for (let i = 1; i < countArr.length; i++) {
    if (maxCount > countArr[i][1]) break;
    result.push(countArr[i][0]);
  }

  function dfs(start) {
    const stack = [];
    const visited = Array(N + 1).fill(false);

    stack.push(start);
    visited[start] = true;

    let count = 0;

    while (stack.length > 0) {
      const cur = stack.pop();
      count++;

      for (let i = 0; i < graph[cur].length; i++) {
        const next = graph[cur][i];
        if (!visited[next]) {
          stack.push(next);
          visited[next] = true;
        }
      }
    }

    return count;
  }

  return result.join(" ");
}

console.log(solution());
