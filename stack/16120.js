"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? 0 : "input.txt";
const input = fs.readFileSync(filePath).toString().trim();

function solution() {
  const stack = [];
  const PPAP = "PPAP";

  for (const char of input) {
    stack.push(char);
    if (stack.length >= PPAP.length) {
      let flag = true;
      for (let i = 0; i < PPAP.length; i++) {
        if (stack[stack.length - 1 - i] !== PPAP[PPAP.length - 1 - i]) {
          flag = false;
          break;
        }
      }

      if (flag) {
        for (let i = 0; i < PPAP.length; i++) {
          stack.pop();
        }
        stack.push("P");
      }
    }
  }

  if (stack.length === 1 && stack[0] === "P") {
    return "PPAP";
  }

  return "NP";
}

console.log(solution());
