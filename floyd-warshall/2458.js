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
  const [[N, M], ...edges] = input;
  const graph = Array.from({ length: N + 1 }, () => Array(N + 1).fill(false));

  for (const [A, B] of edges) {
    graph[A][B] = true;
  }

  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        if (graph[i][k] && graph[k][j]) {
          graph[i][j] = true; // i -> k -> j 로 키 비교가 연결됨!
        }
      }
    }
  }

  let result = 0;

  for (let i = 1; i <= N; i++) {
    let count = 0;

    for (let j = 1; j <= N; j++) {
      if (i === j) continue;

      if (graph[i][j] || graph[j][i]) {
        count++;
      }
    }

    if (count === N - 1) {
      result++;
    }
  }

  return result;
}

console.log(solution());
