"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

function solution() {
  const positiveNums = [];
  const negativeNums = [];
  let zeroCount = 0;

  for (let i = 1; i < input.length; i++) {
    const num = input[i];
    if (num > 0) {
      positiveNums.push(num);
    } else if (num < 0) {
      negativeNums.push(num);
    } else {
      zeroCount++;
    }
  }

  positiveNums.sort((a, b) => b - a);
  negativeNums.sort((a, b) => a - b);

  let result = positiveNums.length % 2 == 0 ? 0 : positiveNums.pop();

  for (let i = 0; i < positiveNums.length - 1; i += 2) {
    result += Math.max(
      positiveNums[i] + positiveNums[i + 1], //둘 중 하나가 1일 때
      positiveNums[i] * positiveNums[i + 1],
    );
  }

  if (negativeNums.length % 2 != 0) {
    if (zeroCount != 0) {
      negativeNums.pop();
    } else {
      result += negativeNums.pop();
    }
  }

  for (let i = 0; i < negativeNums.length - 1; i += 2) {
    result += negativeNums[i] * negativeNums[i + 1];
  }

  return result;
}

console.log(solution());
