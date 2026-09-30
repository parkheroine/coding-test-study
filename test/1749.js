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
  const [[N, M], ...board] = input;

  let result = -Infinity;
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      //i X j 행렬의 부분합

      for (let y = 0; y <= N - i; y++) {
        for (let x = 0; x <= M - j; x++) {
          let sum = 0;
          for (let k = y; k < y + i; k++) {
            for (let l = x; l < x + j; l++) {
              sum += board[k][l];
            }
          }
          result = Math.max(result, sum);
        }
      }
    }
  }

  return result;
}

console.log(solution());
