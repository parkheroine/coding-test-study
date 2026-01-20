"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim();

const N = Number(input);

function solution() {
  if (N % 2 === 0) {
    return "CY";
  }
  return "SK";
}

console.log(solution());
