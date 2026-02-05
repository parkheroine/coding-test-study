"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

function solution() {
  const arr = input;

  const result = [];

  while (!arr.every((value, index) => value === index + 1)) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        result.push(arr.join(" "));
      }
    }
  }

  return result.join("\n");
}

console.log(solution());
