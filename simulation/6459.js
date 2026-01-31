"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

function solution() {
  const result = [];
  for (let i = 1; i < input.length; i++) {
    const N = input[i];
    const rooms = Array(N).fill(true);
    for (let j = 2; j <= N; j++) {
      for (let k = 0; k < N; k++) {
        if ((k + 1) % j === 0) {
          rooms[k] = !rooms[k];
        }
      }
    }
    result.push(rooms.filter((item) => item === true).length);
  }
  return result.join("\n");
}

console.log(solution());
