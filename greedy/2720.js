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
  const result = [];
  const coins = [25, 10, 5, 1];
  for (let i = 1; i < input.length; i++) {
    let value = input[i];
    const answer = Array(4).fill(0);

    for (let j = 0; j < coins.length; j++) {
      const coin = coins[j];

      while (value >= coin) {
        const count = Math.floor(value / coin);
        value = value - count * coin;
        answer[j] = count;
      }
    }

    result.push(answer.join(" "));
  }
  return result.join("\n");
}

console.log(solution());
