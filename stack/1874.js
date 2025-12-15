"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

class Stack {
  constructor() {
    this._state = [];
  }
  push(value) {
    this._state.push(value);
  }
  pop() {
    if (this._state.length == 0) {
      return -1;
    }
    const top = this._state.pop();
    return top;
  }
  get top() {
    const length = this._state.length;
    return length === 0 ? -1 : this._state[length - 1];
  }
}

const stack = new Stack();

const n = input[0];

let current = 1; //push 해야할 숫자
let answer = "";

for (let i = 1; i <= n; i++) {
  const target = input[i]; //출력해야할 숫자

  while (target > stack.top && current <= n) {
    stack.push(current);
    current++;
    answer += "+\n";
  }

  if (target < stack.top) {
    answer = "NO";
    break;
  }

  stack.pop();
  answer += "-\n";
}

console.log(answer);
