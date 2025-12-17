"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n").slice();
const answer = [];
input.pop();
for (const str of input) {
  const stack = [];
  let isValid;
  for (const character of str) {
    if (character === "(" || character === "[") {
      stack.push(character);
    }
    if (character === ")") {
      if (stack.length > 0 && stack[stack.length - 1] === "(") {
        stack.pop();
      } else {
        isValid = false;
        break;
      }
    }
    if (character === "]") {
      if (stack.length > 0 && stack[stack.length - 1] === "[") {
        stack.pop();
      } else {
        isValid = false;
        break;
      }
    }
  }

  if (isValid === false) {
    answer.push("no");
  } else if (stack.length === 0) {
    answer.push("yes");
  } else {
    answer.push("no");
  }
}

console.log(answer.join("\n"));
