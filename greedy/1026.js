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
  const listA = input[1];
  const listB = input[2];
  listA.sort((a, b) => a - b);
  listB.sort((a, b) => b - a);

  let result = 0;
  for (let i = 0; i < listA.length; i++) {
    result += listA[i] * listB[i];
  }
  return result;
}
console.log(solution());
