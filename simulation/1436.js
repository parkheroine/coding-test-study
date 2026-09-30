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
  const MAX = 10000666;
  let count = 0;

  for (let i = 666; i < MAX; i++) {
    if (String(i).includes("666")) {
      count++;
    }
    if (count === N) {
      return i;
    }
  }
}

console.log(solution());
