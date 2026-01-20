"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));
const A = input[1];
const B = input[2];

function solution() {
  const set = new Set([...A, ...B]);
  const interSectionCount = A.length + B.length - set.size;

  return set.size - interSectionCount;
}

console.log(solution());
