"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim();

class Stack {
  constructor() {
    this._store = [];
  }

  push(value) {
    this._store.push(value);
  }
  pop() {
    if (this._store.length === 0) return -1;
    return this._store.pop();
  }
  get size() {
    return this._store.length;
  }

  get store() {
    return this._store;
  }
  get top() {
    return this._store[this.size - 1];
  }
}

function solution() {
  const stack = new Stack();
  for (const item of input) {
    if (item === "(" || item === "[") {
      stack.push(item);
      continue;
    }
    const fair = item === ")" ? "(" : "[";
    const point = item === ")" ? 2 : 3;

    if (stack.top === fair) {
      stack.pop();
      stack.push(point);
    } else {
      let subSum = 0;
      if (typeof stack.top === "number") {
        while (stack.size && typeof stack.top === "number") {
          const top = stack.pop();
          subSum += top;
        }
      }
      if (stack.top !== fair) return 0;
      stack.pop();
      stack.push(point * subSum);
    }
  }

  let result = 0;
  while (stack.size) {
    const item = stack.pop();
    if (typeof item !== "number") return 0;
    result += item;
  }
  return result;
}

console.log(solution());
