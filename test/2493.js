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
  const towers = input[1];
  const result = Array(N).fill(0);
  const stack = [];

  for (let i = towers.length - 1; i >= 0; i--) {
    const curh = towers[i];
    while (stack.length > 0) {
      const [tIndex, th] = stack[stack.length - 1];
      if (th > curh) {
        break;
      }
      const [index, h] = stack.pop();
      result[index] = i + 1;
    }
    stack.push([i, curh]);
  }

  return result.join(" ");
}

console.log(solution());
