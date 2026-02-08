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
  let oneCount = 0;

  for (let i = 1; i < input.length; i++) {
    const num = input[i];
    if (num === 0) {
      zeroCount++;
    } else if (num === 1) {
      oneCount++;
    } else if (num > 0) {
      positiveNums.push(num);
    } else if (num < 0) {
      negativeNums.push(num);
    }
  }

  positiveNums.sort((a, b) => b - a);
  negativeNums.sort((a, b) => a - b);

  let result = 0;

  for (let i = 0; i < positiveNums.length; i += 2) {
    if (i + 1 < positiveNums.length) {
      result += positiveNums[i] * positiveNums[i + 1];
    } else {
      result += positiveNums[i];
    }
  }

  for (let i = 0; i < negativeNums.length; i += 2) {
    if (i + 1 < negativeNums.length) {
      result += negativeNums[i] * negativeNums[i + 1];
    } else {
      result += zeroCount > 0 ? 0 : negativeNums[i];
    }
  }

  result += oneCount;
  return result;
}

console.log(solution());
