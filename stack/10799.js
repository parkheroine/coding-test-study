"use strict";

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const input = fs.readFileSync(filePath).toString().trim() + "0";

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
}

function solution() {
  let answer = 0;
  const stack = new Stack();

  for (let i = 0; i < input.length - 1; i++) {
    const cur = input[i];
    const next = input[i + 1];

    if (cur === "(") {
      if (next === ")") {
        //레이저
        answer += stack.size;
        i += 1;
        continue;
      } else {
        stack.push("(");
      }
    } else {
      //나무토막 끝
      answer += 1;
      stack.pop();
    }
  }

  return answer;
}

console.log(solution());
