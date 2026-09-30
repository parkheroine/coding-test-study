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
  const [[N], [M], ...busInfos] = input;
  const dist = Array.from({ length: N }, () => Array(N).fill(Infinity));

  for (let i = 0; i < N; i++) {
    dist[i][i] = 0;
  }

  for (const [u, v, cost] of busInfos) {
    dist[u - 1][v - 1] = Math.min(dist[u - 1][v - 1], cost);
  }

  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
      }
    }
  }

  const result = dist
    .map((row) => row.map((val) => (val === Infinity ? 0 : val)).join(" "))
    .join("\n");
  return result;
}

console.log(solution());
