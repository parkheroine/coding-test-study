"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const T = Number(input[0]);

let inputIndex = 1;

const answer = [];
for (let t = 0; t < T; t++) {
  const [M, N, K] = input[inputIndex].split(" ").map(Number);
  inputIndex++;

  const graph = Array.from({ length: N + 2 }, () => Array(M + 2).fill(0));
  const visited = Array.from({ length: N + 2 }, () => Array(M + 2).fill(false));
  const direction = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  for (let i = 0; i < K; i++) {
    const [X, Y] = input[inputIndex].split(" ").map(Number);
    graph[Y + 1][X + 1] = 1;
    inputIndex++; // 다음 줄로 이동
  }

  function dfs(y, x) {
    if (visited[y][x]) return;
    visited[y][x] = true;
    for (const dItem of direction) {
      const [dy, dx] = dItem;
      const nextY = y + dy;
      const nextX = x + dx;
      if (!visited[nextY][nextX] && graph[nextY][nextX] === 1) {
        dfs(nextY, nextX);
      }
    }
  }

  let result = 0;
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      if (!visited[i][j] && graph[i][j]) {
        result++;
        dfs(i, j);
      }
    }
  }
  answer.push(result);
}

console.log(answer.join("\n"));
