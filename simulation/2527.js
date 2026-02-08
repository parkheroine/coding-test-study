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
  const result = [];
  for (let i = 0; i < input.length; i++) {
    const [x1, y1, x2, y2, x3, y3, x4, y4] = input[i];

    //안만남
    if (x2 < x3 || x4 < x1 || y2 < y3 || y4 < y1) {
      result.push("d");
    } else if (
      (x2 === x3 && y1 === y4) ||
      (x1 === x4 && y1 === y4) ||
      (x1 === x4 && y2 === y3) ||
      (x2 === x3 && y2 === y3)
    ) {
      result.push("c");
    } else if (x2 === x3 || x1 === x4 || y1 === y4 || y2 === y3) {
      result.push("b");
    } else {
      result.push("a");
    }
  }
  return result.join("\n");
}

console.log(solution());
