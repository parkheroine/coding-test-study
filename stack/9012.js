"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const T = Number(input[0]);

class Stack {
  constructor() {
    this._store = [];
  }
  push(value) {
    this._store.push(value);
  }
  pop() {
    if (this._store.length === 0) {
      return -1;
    }
    return this._store.pop();
  }
  get size() {
    return this._store.length;
  }
}

function solution() {
  const result = [];
  for (let i = 1; i < T + 1; i++) {
    const targetString = input[i];
    const stack = new Stack();

    let isValid = true;
    for (let j = 0; j < targetString.length; j++) {
      const character = targetString[j];
      if (character === "(") {
        stack.push(character);
      }
      if (character === ")") {
        const top = stack.pop();
        if (top === "(") continue;
        else {
          isValid = false;
        }
      }
    }
    if (isValid && stack.size === 0) {
      result.push("YES");
    } else {
      result.push("NO");
    }
  }

  return result.join("\n");
}

console.log(solution());
