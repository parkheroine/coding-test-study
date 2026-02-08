"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

function solution() {
  const result = [];

  for (let i = 1; i < input.length; i++) {
    let numArr = [];
    for (let j = 0; j < input[i].length; j++) {
      const char = input[i][j];
      if (char.match(/[a-z]/)) {
        if (numArr.length) {
          result.push(BigInt(numArr.join("")));
          numArr = [];
        }
      } else {
        numArr.push(char);
      }
    }
    if (numArr.length) {
      result.push(BigInt(numArr.join("")));
      numArr = [];
    }
  }

  result.sort((a, b) => (a < b ? -1 : 1));

  return result.join("\n");
}

console.log(solution());
