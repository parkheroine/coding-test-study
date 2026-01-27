"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, K] = input[0].split(" ").map(Number);
input.splice(0, 1);
const coins = input.map(Number);

function solution() {
  let result = 0;
  let remain = K;
  for (let i = coins.length - 1; i >= 0; i--) {
    while (remain >= coins[i]) {
      remain -= coins[i];
      result++;
    }
  }
  return result;
}

console.log(solution());
