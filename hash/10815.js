"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

function solution() {
  const set = new Set(input[1]);
  const targetList = input[3];
  const result = [];
  for (let target of targetList) {
    result.push(set.has(target) ? 1 : 0);
  }
  return result.join(" ");
}

console.log(solution());
