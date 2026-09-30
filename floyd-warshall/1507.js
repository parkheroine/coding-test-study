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
  const [[N], ...dist] = input;
  const unused = Array.from({ length: N }, () => Array(N).fill(false));

  console.log(dist);
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (i === j || k === i || k === j) continue;
        if (dist[i][j] > dist[i][k] + dist[k][j]) {
          //   return -1;
        }

        if (dist[i][j] === dist[i][k] + dist[k][j]) {
          unused[i][j] = true;
        }
      }
    }
  }

  console.log(unused);

  let answer = 0;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (!unused[i][j]) {
        answer += dist[i][j];
      }
    }
  }

  return answer;
}

console.log(solution());
