"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

function solution() {
  let result = 0;
  let value = 1000 - input[0];
  const coins = [500, 100, 50, 10, 5, 1];

  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];

    while (value >= coin) {
      const count = Math.floor(value / coin);
      value = value - count * coin;
      result += count;
    }
  }

  return result;
}

console.log(solution());
