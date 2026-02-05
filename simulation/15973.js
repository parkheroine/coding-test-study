"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const [x1, y1, x2, y2] = input[0];
const [x3, y3, x4, y4] = input[1];

function solution() {
  //B는 고정으로 생각

  if (x4 < x1 || x2 < x3 || y4 < y1 || y2 < y3) {
    // 떨어져 있는 경우 먼저 제외
    return "NULL";
  }

  if (
    (x2 === x3 && y2 === y3) ||
    (x1 === x4 && y2 === y3) ||
    (x1 === x4 && y1 === y4) ||
    (x2 === x3 && y1 === y4)
  ) {
    return "POINT";
  }

  if (x2 === x3 || y2 === y3 || x1 === x4 || y1 === y4) {
    return "LINE";
  }

  return "FACE";
}

console.log(solution());
