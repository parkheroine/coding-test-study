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
  const N = input[0][0];
  input.splice(0, 1);
  const dataArr = input;
  const result = [];

  for (let i = 0; i < N; i++) {
    let count = 0;
    for (let j = 0; j < N; j++) {
      if (i === j) continue;
      if (dataArr[j][0] > dataArr[i][0] && dataArr[j][1] > dataArr[i][1]) {
        count++;
      }
    }
    result.push(count + 1);
  }

  return result.join(" ");
}

console.log(solution());
