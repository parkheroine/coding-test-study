"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

input.splice(0, 1);

function solution() {
  input.sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1];
  });

  let result = 0;
  let prevEnd = -1;

  for (let i = 0; i < input.length; i++) {
    const [start, end] = input[i];
    if (prevEnd <= start) {
      result++;
      prevEnd = end;
    }
  }

  return result;
}

console.log(solution());
